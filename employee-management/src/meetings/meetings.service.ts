import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingDTO, UpdateMeetingDTO } from './dto/meetings.dto';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getMeetingById(id: number): Promise<Meeting | undefined> {
    return await this.meetingRepository.findOne({
      where: {
        id,
      },
      relations: ['attendees'],
    });
  }

  async createMeeting(createMeetingDTO: CreateMeetingDTO): Promise<Meeting> {
    const { attendees, ...meetingData } = createMeetingDTO;

    // Check if the associated Employees exist
    const attendeeEntities = await this.employeeRepository.findByIds(attendees);
    if (attendees.length !== attendeeEntities.length) {
      throw new NotFoundException('One or more attendees not found');
    }

    const meeting = this.meetingRepository.create(meetingData);
    meeting.attendees = attendeeEntities;

    return await this.meetingRepository.save(meeting);
  }

  async updateMeeting(
    id: number,
    updateMeetingDTO: UpdateMeetingDTO,
  ): Promise<Meeting | undefined> {
    const meeting = await this.meetingRepository.findOne({
      where: { id },
    });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    this.meetingRepository.merge(meeting, updateMeetingDTO);

    return await this.meetingRepository.save(meeting);
  }

  async deleteMeeting(id: number): Promise<Meeting | undefined> {
    const meeting = await this.meetingRepository.findOne({
      where: { id },
    });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    return await this.meetingRepository.remove(meeting);
  }
}
