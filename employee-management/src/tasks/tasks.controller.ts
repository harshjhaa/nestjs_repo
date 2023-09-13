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
import { TaskService } from './tasks.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async getTaskById(@Param('id') id: number) {
    const task = await this.taskService.getTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post()
  async createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return await this.taskService.createTask(createTaskDTO);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ) {
    const task = await this.taskService.updateTask(id, updateTaskDTO);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    const deletedTask = await this.taskService.deleteTask(id);
    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    }
    return deletedTask;
  }
}
