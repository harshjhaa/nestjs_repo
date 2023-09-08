// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userdata } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Userdata)
    private readonly userRepository: Repository<Userdata>,
  ) {}

  async createUser(user: Userdata): Promise<Userdata> {
    return this.userRepository.save(user);
  }

  // async getUserById(id: any): Promise<Userdata> {
  //   return this.userRepository.findOne(id);
  // }

  async getUserById(id: number): Promise<Userdata> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: number, user: Userdata): Promise<Userdata> {
    await this.userRepository.update(id, user);
    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
