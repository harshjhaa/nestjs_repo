import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { Department } from 'src/departments/entities/department.entity';
import { CreateUserDto } from './dto/create-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    departmentId: number,
  ): Promise<Users> {
    const { name, age, password, email } = createUserDto;
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
    });
    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
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

  async getAllUsers(): Promise<Users[]> {
    const user = await this.userRepository.find({ relations: ['department'] });
    if (!user) {
      throw new NotFoundException(`No user found`);
    }
    return user;
  }

  async getUserById(id: number): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: number, user: Users): Promise<Users> {
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
