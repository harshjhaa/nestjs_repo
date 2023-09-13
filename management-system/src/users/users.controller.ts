import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('createuser/:departmentId')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: Users })
  @ApiOkResponse({ description: 'User Created Successfully', type: Users })
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Param('departmentId') departmentId: number,
  ): Promise<Users> {
    return this.userService.createUser(createUserDto, departmentId);
  }

  // @Patch('/serviceTypeConfig')
  // async updateServiceTypeConfig(
  //   @Body()
  //   @Query('where')
  //   where: string,
  // ): Promise<void> {
  //   // return this.userService.updateServiceTypeConfig(id);
  // }

  @Get('/get-all-users')
  async getAllUsers(): Promise<Users[]> {
    return this.userService.getAllUsers();
  }

  @Get('getuser/:id')
  async getUserById(@Param('id') id: string): Promise<Users> {
    return this.userService.getUserById(Number(id));
  }

  @Put('updateuser/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: Users,
  ): Promise<Users> {
    return this.userService.updateUser(id, user);
  }

  @Delete('deleteuser/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
