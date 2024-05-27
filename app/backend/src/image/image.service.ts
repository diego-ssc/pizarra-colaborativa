import { Inject, Injectable } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';

@Injectable()
export class ImageService {
  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient: Client) {}

  async getImage(imageName: string) {
    return await this.minioClient.getObject('images', imageName);
  }

  async putImage(imageName: string, blob: Buffer) {
    await this.minioClient.putObject('images', imageName, blob);
  }
}
