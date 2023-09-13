import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly task: Repository<Task>,
    @InjectRepository(Employee)
    private readonly employee: Repository<Employee>,
  ) {}

  async getTaskById(id: number): Promise<Task | undefined> {
    return await this.task.findOne({
      where: {
        id,
      },
      relations: ['employee'],
    });
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { employeeId, ...taskData } = createTaskDTO;
    // Check if the associated Employee exists
    const employee = await this.employee.findOne({
      where: {
        id: employeeId,
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const task = this.task.create(taskData);
    task.employee = employee;

    return await this.task.save(task);
  }

  async updateTask(
    id: number,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<Task | undefined> {
    const task = await this.task.findOne({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    this.task.merge(task, updateTaskDTO);

    return await this.task.save(task);
  }

  async deleteTask(id: number): Promise<Task | undefined> {
    const task = await this.task.findOne({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.task.remove(task);
  }
}
