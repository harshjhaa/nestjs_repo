// src/department/department.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Userdata } from "./user.entity";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Userdata, (user) => user.department)
  users: Userdata[];
}
