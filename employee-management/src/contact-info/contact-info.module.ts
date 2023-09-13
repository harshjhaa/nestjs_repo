import { Module } from '@nestjs/common';
import { ContactInfoController } from './contact-info.controller';
import { ContactInfoService } from './contact-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from './entities/contact-info.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfo, Employee])],
  controllers: [ContactInfoController],
  providers: [ContactInfoService],
})
export class ContactInfoModule {}
