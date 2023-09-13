import { Module } from '@nestjs/common';
import { MeetingController } from './meetings.controller';
import { MeetingService } from './meetings.service';
import { Employee } from 'src/employees/entities/employee.entity';
import { Meeting } from './entities/meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting, Employee])],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingsModule {}
