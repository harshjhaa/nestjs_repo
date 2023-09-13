import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './entities/contact-info.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { CreateContactInfoDTO } from './dto/contact-info.dto';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getContactInfoById(id: number): Promise<ContactInfo | undefined> {
    return await this.contactInfoRepository.findOne({
      where: {
        id,
      },
      relations: ['employee'],
    });
  }

  async createContactInfo(
    createContactInfoDTO: CreateContactInfoDTO,
  ): Promise<ContactInfo> {
    const { employeeId, ...contactInfoData } = createContactInfoDTO;

    // Check if the associated Employee exists
    const employee = await this.employeeRepository.findOne({
      where: {
        id: employeeId,
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const contactInfo = this.contactInfoRepository.create(contactInfoData);
    contactInfo.employee = employee;

    return await this.contactInfoRepository.save(contactInfo);
  }

  async updateContactInfo(
    id: number,
    updateContactInfoDTO: CreateContactInfoDTO,
  ): Promise<ContactInfo | undefined> {
    const contactInfo = await this.contactInfoRepository.findOne({
      where: {
        id,
      },
    });
    if (!contactInfo) {
      throw new NotFoundException('ContactInfo not found');
    }

    this.contactInfoRepository.merge(contactInfo, updateContactInfoDTO);

    return await this.contactInfoRepository.save(contactInfo);
  }

  async deleteContactInfo(id: number): Promise<ContactInfo | undefined> {
    const contactInfo = await this.contactInfoRepository.findOne({
      where: {
        id,
      },
    });
    if (!contactInfo) {
      throw new NotFoundException('ContactInfo not found');
    }

    return await this.contactInfoRepository.remove(contactInfo);
  }
}
