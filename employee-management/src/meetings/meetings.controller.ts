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
import { MeetingService } from './meetings.service';
import { CreateMeetingDTO, UpdateMeetingDTO } from './dto/meetings.dto';

@Controller('meetings')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Get(':id')
  async getMeetingById(@Param('id') id: number) {
    const meeting = await this.meetingService.getMeetingById(id);
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }
    return meeting;
  }

  @Post()
  async createMeeting(@Body() createMeetingDTO: CreateMeetingDTO) {
    return await this.meetingService.createMeeting(createMeetingDTO);
  }

  @Put(':id')
  async updateMeeting(
    @Param('id') id: number,
    @Body() updateMeetingDTO: UpdateMeetingDTO,
  ) {
    const meeting = await this.meetingService.updateMeeting(
      id,
      updateMeetingDTO,
    );
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }
    return meeting;
  }

  @Delete(':id')
  async deleteMeeting(@Param('id') id: number) {
    const deletedMeeting = await this.meetingService.deleteMeeting(id);
    if (!deletedMeeting) {
      throw new NotFoundException('Meeting not found');
    }
    return deletedMeeting;
  }
}
