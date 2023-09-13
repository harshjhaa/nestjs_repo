import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DepartmentsModule } from './departments/departments.module';
// import { LoggerMiddleware } from './middlewares/logger.global.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from 'db/data-source';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    //connecting with the database
    // TypeOrmModule.forRootAsync({
    //   imports: [
    //     ConfigModule.forRoot({
    //       isGlobal: true,
    //       // envFilePath: ".local.env" //by default it is .env in root dir
    //     }),
    //   ],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get<string>('DB_HOST'),
    //     port: configService.get<number>('DB_PORT'),
    //     username: configService.get<string>('DB_USERNAME'),
    //     database: configService.get<string>('DB_NAME'),
    //     // synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
    //     synchronize: false,
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     logging: true,
    //   }),
    //   inject: [ConfigService],
    // }),

    TypeOrmModule.forRoot(dataSourceOptions),

    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration available throughout the app
      envFilePath: '.env', //by default .env in root directory
    }),
    UsersModule,
    DepartmentsModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class RootModule {}
//for middleware
// export class RootModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes(UsersController, DepartmentsController); //we can pass multiple contorllers
//     // .forRoutes({ path: 'users', method: RequestMethod.POST });
//   }
// }
