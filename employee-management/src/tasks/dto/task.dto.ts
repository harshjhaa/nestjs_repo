import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskDTO {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  employeeId: number; // Assuming employeeId is set by the system
}

export class CreateTaskDTO extends TaskDTO {}

export class UpdateTaskDTO extends TaskDTO {}
