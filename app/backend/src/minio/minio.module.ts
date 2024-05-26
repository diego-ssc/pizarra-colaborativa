import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestMinioModule } from 'nestjs-minio';

@Module({
  imports: [
    NestMinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        endPoint: configService.get('MINIO_HOST'),
        port: configService.get('MINIO_PORT'),
        useSSL: configService.get('MINIO_USE_SSL'),
        accessKey: configService.get('MINIO_ROOT_USER'),
        secretKey: configService.get('MINIO_ROOT_PASSWORD'),
      }),
    }),
  ],
})
export class MinioModule {}
