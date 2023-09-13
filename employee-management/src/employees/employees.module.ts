import { Module } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { EmployeeController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ContactInfo } from 'src/contact-info/entities/contact-info.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, ContactInfo, Task, Meeting])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeesModule {}
