// src/user/user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Department } from "./department.entity";
import { Role } from "./role.entity";

@Entity()
export class Userdata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
