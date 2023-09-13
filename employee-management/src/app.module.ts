import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { EmployeesModule } from './employees/employees.module';
import { ContactInfoModule } from './contact-info/contact-info.module';
import { TasksModule } from './tasks/tasks.module';
import { MeetingsModule } from './meetings/meetings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EmployeesModule,
    ContactInfoModule,
    TasksModule,
    MeetingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
