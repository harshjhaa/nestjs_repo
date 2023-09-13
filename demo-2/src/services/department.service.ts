// src/user/user.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// import { Userdata } from "../entities/user.entity";
import { Department } from "src/entities/department.entity";
import { CreateDepartmentDto } from "src/dto/department/create-department.dto";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department> // Inject Department repository
  ) {}

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto
  ): Promise<Department> {
    const { name } = createDepartmentDto;
    const department = await this.departmentRepository.findOne({
      where: { name },
    });
    if (department) {
      throw new BadRequestException(
        `Department with name ${name} already exists.`
      );
    }
    const newDepartment = this.departmentRepository.create({
      name,
    });
    return this.departmentRepository.save(newDepartment);
  }

  async getAllDepartments(): Promise<Department[]> {
    const department = await this.departmentRepository.find();

    if (!department) {
      throw new NotFoundException(`No department found.`);
    }

    return department;
  }

  async getDepartmentById(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found.`);
    }

    return department;
  }

  async getDepartmentByName(departmentName: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { name: departmentName },
    });

    if (!department) {
      throw new NotFoundException(
        `Department with name ${departmentName} not found.`
      );
    }

    return department;
  }

  async getDepartmentAlongWithAllUsers(
    departmentName: string
  ): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: {
        name: departmentName,
      },
      relations: ["users"],
    });

    if (!department) {
      throw new NotFoundException(`No department found.`);
    }

    return department;
  }

  async deleteDepartmentById(id: number): Promise<{ message: string }> {
    await this.departmentRepository.delete(id);
    return { message: `Department deleted` };
  }

  async deleteDepartmentByName(
    departmentName: string
  ): Promise<{ message: string }> {
    await this.departmentRepository.delete(departmentName);
    return { message: `Department deleted` };
  }
}
