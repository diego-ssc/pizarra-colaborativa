import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [MinioModule],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
