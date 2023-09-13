import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto/employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees() {
    return await this.employeeService.getAllEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number) {
    const employee = await this.employeeService.getEmployeeById(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  @Post()
  async createEmployee(@Body() createEmployeeDTO: CreateEmployeeDTO) {
    return await this.employeeService.createEmployee(createEmployeeDTO);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() updateEmployeeDTO: UpdateEmployeeDTO,
  ) {
    const employee = await this.employeeService.updateEmployee(
      id,
      updateEmployeeDTO,
    );
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number) {
    const deletedEmployee = await this.employeeService.deleteEmployee(id);
    if (!deletedEmployee) {
      throw new NotFoundException('Employee not found');
    }
    return deletedEmployee;
  }
}
