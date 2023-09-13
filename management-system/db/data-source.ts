import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  database: configService.get<string>('DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
