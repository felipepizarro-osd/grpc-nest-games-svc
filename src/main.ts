import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { protobufPackage } from './games/games.pb';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50053',
        package: protobufPackage,
        protoPath: join('node_modules/grpc-nest-proto/proto/games.proto'),
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}
bootstrap();
