import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Department } from './entities/department.entity';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
@ApiTags('Departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new Department' })
  async createDepartment(
    @Body(new ValidationPipe()) createDepartmentDto: CreateDepartmentDto,
  ): Promise<{ message: string; department: Department }> {
    const createdDepartment =
      await this.departmentsService.createDepartment(createDepartmentDto);
    return {
      message: 'Department created successfully',
      department: createdDepartment,
    };
  }

  @Get('get')
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentsService.getAllDepartments();
  }

  @Get('get-by-id/:id')
  async getDepartmentById(@Param('id') id: string): Promise<Department> {
    return this.departmentsService.getDepartmentById(Number(id));
  }

  @Get('get-by-name/:departmentName')
  async getDepartmentByName(
    @Param('departmentName') departmentName: string,
  ): Promise<Department> {
    return this.departmentsService.getDepartmentByName(departmentName);
  }

  @Get('get-department-with-user/:departmentName')
  async getDepartmentAlongWithAllUsers(
    @Param('departmentName') departmentName: string,
  ): Promise<Department> {
    return this.departmentsService.getDepartmentAlongWithAllUsers(
      departmentName,
    );
  }

  @Delete('delete-by-id/:id')
  async deleteDepartmentById(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return this.departmentsService.deleteDepartmentById(id);
  }

  @Delete('delete-by-name/:departmentName')
  async deleteDepartmentByName(
    @Param('departmentName') departmentName: string,
  ): Promise<{ message: string }> {
    return this.departmentsService.deleteDepartmentByName(departmentName);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.departmentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDepartmentDto: UpdateDepartmentDto,
  // ) {
  //   return this.departmentsService.update(+id, updateDepartmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.departmentsService.remove(+id);
  // }
}
