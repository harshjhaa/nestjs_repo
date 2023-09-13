import { ContactInfo } from 'src/contact-info/entities/contact-info.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Employee, (employee) => employee.directReports, {
    onDelete: 'SET NULL',
  })
  managers: Employee;

  @OneToMany(() => Employee, (employee) => employee.managers)
  directReports: Employee[];

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  contactInfo: ContactInfo;

  //here we are assuming one employee can be assigned to many tasks
  @OneToMany(() => Task, (tasks) => tasks.employee)
  tasks: Task[];

  //auto cascading happens here
  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: Meeting[];
}
