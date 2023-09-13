// src/app.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//controllers
import { UserController } from "./controllers/user.controller";
import { DepartmentController } from "./controllers/department.controller";
import { RoleController } from "./controllers/role.controller";

//service
import { UserService } from "./services/user.service";
import { DepartmentService } from "./services/department.service";
import { RoleService } from "./services/role.service";

//entity
import { Userdata } from "./entities/user.entity";
import { Department } from "./entities/department.entity";
import { Role } from "./entities/role.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "127.0.0.1",
      port: 5432,
      username: "postgres",
      database: "nestjs_demo",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      logging: true,
      migrations: ["src/migration/*.ts"],
    }),
    TypeOrmModule.forFeature([Userdata, Department, Role]),
  ],
  controllers: [UserController, DepartmentController, RoleController],
  providers: [UserService, DepartmentService, RoleService],
})
export class AppModule {}
