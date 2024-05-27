import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':imageID')
  async getImage(@Param('imageID') imageID: string, @Res() res: Response) {
    const imageStream = await this.imageService.getImage(imageID);
    res.type('application/octet-stream');
    imageStream.pipe(res);
  }

  @Put(':imageID')
  async putImage(@Param('imageID') imageID: string, @Body() body: Buffer) {
    await this.imageService.putImage(imageID, body);
  }
}
