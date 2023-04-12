import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log(
    'app is about to start on port ',
    process.env.NODE_DOCKER_PORT || 4000,
  );
  await app.listen(process.env.NODE_DOCKER_PORT || 4000);
}
bootstrap();
