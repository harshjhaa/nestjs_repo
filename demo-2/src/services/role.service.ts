import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Role } from "../entities/role.entity";
import { Userdata } from "src/entities/user.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Userdata)
    private readonly userdataRepository: Repository<Userdata>
  ) {}

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async getRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async createRole(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }

  async updateRole(id: number, role: Role): Promise<Role> {
    await this.getRoleById(id); // Check if role exists
    role.id = id; // Set the ID for the role to update
    return this.roleRepository.save(role);
  }

  async deleteRole(id: number): Promise<void> {
    await this.getRoleById(id); // Check if role exists
    await this.roleRepository.delete(id);
  }

  async assignUsersToRole(roleId: number, userIds: number[]): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({
        where: {
          id: roleId,
        },
        relations: ["users"],
      });
      if (!role) {
        throw new NotFoundException(`Role with ID ${roleId} not found`);
      }
      // Assuming you have a User entity and a many-to-many relationship set up
      const users = await this.userdataRepository.find({
        // Use `In` to filter Userdata entities based on user IDs
        where: { id: In(userIds["userIds"]) },
      });
      role.users = users;
      return this.roleRepository.save(role);
    } catch (err) {
      console.log("xx err ", err);
    }
  }
}
