// src/user/user.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Userdata } from "../entities/user.entity";
import { Department } from "src/entities/department.entity";
import { CreateUserDto } from "src/dto/user/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Userdata)
    private readonly userRepository: Repository<Userdata>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department> // Inject Department repository
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    departmentId: number
  ): Promise<Userdata> {
    const { name, age, password, email } = createUserDto;
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
    });
    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`
      );
    }
    const user = {
      name,
      age,
      email,
      password,
      department,
    };
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<Userdata[]> {
    const user = await this.userRepository.find({ relations: ["department"] });
    if (!user) {
      throw new NotFoundException(`No user found`);
    }
    return user;
  }

  async getUserById(id: number): Promise<Userdata> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: number, user: Userdata): Promise<Userdata> {
    await this.userRepository.update(id, user);
    return this.getUserById(id);
  }

  async getUserDepartment(userId: number): Promise<Department> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return user.department;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
