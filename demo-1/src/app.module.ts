import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import envValidationSchema from './validation/configValidationSchema';
@Module({
  // imports: [ConfigModule.forRoot()],
  // imports: [
  //   ConfigModule.forRoot({
  //     validate,
  //   }),
  // ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration available throughout the app
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: false, // Report all validation errors at once
        allowUnknown: true, // Allow unknown properties in .env file
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
