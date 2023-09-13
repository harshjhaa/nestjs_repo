// meeting.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { EmployeeDto } from 'src/employees/dto/employee.dto';

export class MeetingDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  zoomUrl: string;

  @IsNotEmpty()
  attendees: EmployeeDto[];
}

export class CreateMeetingDTO extends MeetingDto {}

export class UpdateMeetingDTO extends MeetingDto {}
