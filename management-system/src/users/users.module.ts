import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UsersMiddleware } from './users.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Department } from 'src/departments/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Department])],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware).forRoutes('users');
  }
}
