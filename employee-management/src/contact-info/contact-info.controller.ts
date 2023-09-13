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
import { ContactInfoService } from './contact-info.service';
import { CreateContactInfoDTO } from './dto/contact-info.dto';

@Controller('contact-info')
export class ContactInfoController {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Get(':id')
  async getContactInfoById(@Param('id') id: number) {
    const contactInfo = await this.contactInfoService.getContactInfoById(id);
    if (!contactInfo) {
      throw new NotFoundException('ContactInfo not found');
    }
    return contactInfo;
  }

  @Post()
  async createContactInfo(@Body() createContactInfoDTO: CreateContactInfoDTO) {
    return await this.contactInfoService.createContactInfo(
      createContactInfoDTO,
    );
  }

  @Put(':id')
  async updateContactInfo(
    @Param('id') id: number,
    @Body() updateContactInfoDTO: CreateContactInfoDTO,
  ) {
    const contactInfo = await this.contactInfoService.updateContactInfo(
      id,
      updateContactInfoDTO,
    );
    if (!contactInfo) {
      throw new NotFoundException('ContactInfo not found');
    }
    return contactInfo;
  }

  @Delete(':id')
  async deleteContactInfo(@Param('id') id: number) {
    const deletedContactInfo =
      await this.contactInfoService.deleteContactInfo(id);
    if (!deletedContactInfo) {
      throw new NotFoundException('ContactInfo not found');
    }
    return deletedContactInfo;
  }
}
