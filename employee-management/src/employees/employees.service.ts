import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { ContactInfo } from 'src/contact-info/entities/contact-info.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto/employee.dto';
// import { EmployeeRepository } from './employees.repository';
// import { ContactInfoRepository } from 'src/contact-info/contact-info.repository';
// import { TaskRepository } from 'src/tasks/tasks.repository';
// import { MeetingRepository } from 'src/meetings/meetings.repository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
  ) {}

  // constructor(
  //   @InjectRepository(Employee)
  //   private readonly employeeRepository: EmployeeRepository,
  //   // @InjectRepository(ContactInfo)
  //   // private readonly contactInfoRepository: ContactInfoRepository,
  //   @InjectRepository(Task)
  //   private readonly taskRepository: TaskRepository,
  //   @InjectRepository(Meeting)
  //   private readonly meetingRepository: MeetingRepository,
  // ) {}

  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async getEmployeeById(id: number): Promise<Employee | undefined> {
    return await this.employeeRepository.findOne({
      where: {
        id,
      },
      relations: ['directReports', 'contactInfo', 'tasks', 'meetings'],
    });
  }

  async createEmployee(
    createEmployeeDTO: CreateEmployeeDTO,
  ): Promise<Employee> {
    const { contactInfo, tasks, meetings, ...employeeData } = createEmployeeDTO;

    // Create the associated entities if their IDs are provided in the DTO
    const employee = this.employeeRepository.create(employeeData);
    if (contactInfo) {
      const contact = await this.contactInfoRepository.findOne({
        where: {
          id: contactInfo.id,
        },
      });
      if (!contact) {
        throw new NotFoundException('ContactInfo not found');
      }
      employee.contactInfo = contact;
    }
    if (tasks) {
      const taskEntities = await this.taskRepository.find({
        where: { id: In(tasks) },
      });
      employee.tasks = taskEntities;
    }
    if (meetings) {
      const meetingEntities = await this.meetingRepository.find({
        where: { id: In(meetings) },
      });
      employee.meetings = meetingEntities;
    }

    return await this.employeeRepository.save(employee);
  }

  async updateEmployee(
    id: number,
    updateEmployeeDTO: UpdateEmployeeDTO,
  ): Promise<Employee | undefined> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id,
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    this.employeeRepository.merge(employee, updateEmployeeDTO);

    return await this.employeeRepository.save(employee);
  }

  async deleteEmployee(id: number): Promise<Employee | undefined> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id,
      },
      relations: ['directReports', 'contactInfo', 'tasks', 'meetings'],
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return await this.employeeRepository.remove(employee);
  }
}
