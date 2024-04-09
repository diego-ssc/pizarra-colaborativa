import { Controller, Post, Body } from '@nestjs/common';
import { CreateWhiteBoardDto } from './dto/createWhiteBoardDto.dto';
import { WhiteBoardService } from './white-board.service';

@Controller('white-board')
export class WhiteBoardController {
  constructor(private whiteBoardService: WhiteBoardService) {}

  @Post()
  createWhiteBoard(@Body() newWhiteBoard: CreateWhiteBoardDto) {
    return this.whiteBoardService.createWhiteBoard(newWhiteBoard);
  }
}
