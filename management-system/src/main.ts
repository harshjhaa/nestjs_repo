import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { RootModule } from './root.module';
// import { LoggerMiddleware } from './middlewares/logger.global.middleware';
import { loggerGlobalMiddleware } from './common/middlewares/logger.global.functional.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    RootModule,
    new FastifyAdapter(),
  );

  // app.use(new LoggerMiddleware().use);
  app.use(loggerGlobalMiddleware);

  await app.listen(3000);
}
bootstrap();
