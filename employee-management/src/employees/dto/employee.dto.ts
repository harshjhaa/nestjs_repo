import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContactInfoDto } from 'src/contact-info/dto/contact-info.dto';
import { TaskDTO } from 'src/tasks/dto/task.dto';
import { MeetingDto } from 'src/meetings/dto/meetings.dto';

export class EmployeeDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  managers: EmployeeDto;

  @IsOptional()
  directReports: EmployeeDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInfoDto)
  contactInfo: ContactInfoDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TaskDTO)
  tasks: TaskDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MeetingDto)
  meetings: MeetingDto[];
}

export class CreateEmployeeDTO extends EmployeeDto {}

export class UpdateEmployeeDTO extends EmployeeDto {}
