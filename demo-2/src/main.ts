import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { setupSwagger } from "./configs/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
