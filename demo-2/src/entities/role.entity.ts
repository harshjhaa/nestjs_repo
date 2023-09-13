// src/role/role.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Userdata } from "./user.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Userdata, (user) => user.roles)
  @JoinTable()
  users: Userdata[];
}
