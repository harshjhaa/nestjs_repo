// src/user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Userdata } from './user.entity';
// import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('booking')
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createuser')
  async createUser(@Body() user: Userdata): Promise<Userdata> {
    return this.userService.createUser(user);
  }
  
  // <donmain>/booking/bookqueue
  @Post('/bookqueue')
  async createQueueBooking(@Body() user: Userdata): Promise<Userdata> {
    return this.userService.createUser(user);
  }

  @Get('getuser/:id')
  async getUserById(@Param('id') id: string): Promise<Userdata> {
    return this.userService.getUserById(Number(id));
  }

  @Put('updateuser/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: Userdata,
  ): Promise<Userdata> {
    return this.userService.updateUser(id, user);
  }

  @Delete('deleteuser/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
