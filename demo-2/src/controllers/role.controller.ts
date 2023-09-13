import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Role } from "src/entities/role.entity";
import { RoleService } from "src/services/role.service";

@Controller("roles")
@ApiTags("Roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @Get(":id")
  async getRoleById(@Param("id") id: number): Promise<Role> {
    return this.roleService.getRoleById(id);
  }

  @Post()
  async createRole(@Body() role: Role): Promise<Role> {
    return this.roleService.createRole(role);
  }

  @Put(":id")
  async updateRole(@Param("id") id: number, @Body() role: Role): Promise<Role> {
    return this.roleService.updateRole(id, role);
  }

  @Delete(":id")
  async deleteRole(@Param("id") id: number): Promise<void> {
    return this.roleService.deleteRole(id);
  }

  @Post(":roleId/assign-users")
  async assignUsersToRole(
    @Param("roleId") roleId: number,
    @Body() userIds: number[]
  ): Promise<Role> {
    return this.roleService.assignUsersToRole(roleId, userIds);
  }
}
