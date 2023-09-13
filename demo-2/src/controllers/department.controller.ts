// src/user/user.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from "@nestjs/common";
import { DepartmentService } from "../services/department.service";
import { Department } from "../entities/department.entity";
import { CreateDepartmentDto } from "src/dto/department/create-department.dto";
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger"; // Import Swagger decorators

@Controller("department")
@ApiTags("Department")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post("create")
  @ApiOperation({ summary: "Create a new Department" })
  async createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto
  ): Promise<{ message: string; department: Department }> {
    const createdDepartment =
      await this.departmentService.createDepartment(createDepartmentDto);
    return {
      message: "Department created successfully",
      department: createdDepartment,
    };
  }

  @Get("get")
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentService.getAllDepartments();
  }

  @Get("get-by-id/:id")
  async getDepartmentById(@Param("id") id: string): Promise<Department> {
    return this.departmentService.getDepartmentById(Number(id));
  }

  @Get("get-by-name/:departmentName")
  async getDepartmentByName(
    @Param("departmentName") departmentName: string
  ): Promise<Department> {
    return this.departmentService.getDepartmentByName(departmentName);
  }

  @Get("get-department-with-user/:departmentName")
  async getDepartmentAlongWithAllUsers(
    @Param("departmentName") departmentName: string
  ): Promise<Department> {
    return this.departmentService.getDepartmentAlongWithAllUsers(
      departmentName
    );
  }

  @Delete("delete-by-id/:id")
  async deleteDepartmentById(
    @Param("id") id: number
  ): Promise<{ message: string }> {
    return this.departmentService.deleteDepartmentById(id);
  }

  @Delete("delete-by-name/:departmentName")
  async deleteDepartmentByName(
    @Param("departmentName") departmentName: string
  ): Promise<{ message: string }> {
    return this.departmentService.deleteDepartmentByName(departmentName);
  }
}
