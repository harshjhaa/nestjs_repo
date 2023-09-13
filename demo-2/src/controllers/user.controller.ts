// src/user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { Userdata } from "../entities/user.entity";
import { CreateUserDto } from "src/dto/user/create-user.dto";
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger"; // Import Swagger decorators

@Controller("user")
@ApiTags("Users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("createuser/:departmentId")
  @ApiOperation({ summary: "Create a new user" })
  @ApiCreatedResponse({ type: Userdata })
  @ApiOkResponse({ description: "User found", type: Userdata })
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Param("departmentId") departmentId: number
  ): Promise<Userdata> {
    return this.userService.createUser(createUserDto, departmentId);
  }

  @Get("get-all-users")
  async getAllUsers(): Promise<Userdata[]> {
    return this.userService.getAllUsers();
  }

  @Get("getuser/:id")
  async getUserById(@Param("id") id: string): Promise<Userdata> {
    return this.userService.getUserById(Number(id));
  }

  @Put("updateuser/:id")
  async updateUser(
    @Param("id") id: number,
    @Body() user: Userdata
  ): Promise<Userdata> {
    return this.userService.updateUser(id, user);
  }

  @Delete("deleteuser/:id")
  async deleteUser(@Param("id") id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
