import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateWhiteBoardDto } from './dto/createWhiteBoardDto.dto';
import { WhiteBoardService } from './white-board.service';
import WhiteBoard from './white-board.entity';
import { UpdateWhiteBoardDto } from './dto/update-whiteboard.dto';

@Controller('whiteboard')
export class WhiteBoardController {
  constructor(private whiteBoardService: WhiteBoardService) {}

  @Get()
  getWhiteBoards(): Promise<WhiteBoard[]> {
    return this.whiteBoardService.getWhiteBoards();
  }

  @Get(':id')
  getWhiteBoardById(@Param('id') id: string): Promise<WhiteBoard> {
    return this.whiteBoardService.getWhiteBoardById(Number(id));
  }

  @Post()
  createWhiteBoard(@Body() newWhiteBoard: CreateWhiteBoardDto) {
    return this.whiteBoardService.createWhiteBoard(newWhiteBoard);
  }

  @Delete(':id')
  deleteWhiteBoardById(@Param('id') id: string) {
    this.whiteBoardService.deleteWhiteBoardById(Number(id));
  }

  @Patch(':id')
  updateWhiteBoard(
    @Param('id') id: string,
    @Body() whiteBoard: UpdateWhiteBoardDto,
  ) {
    return this.whiteBoardService.updateWhiteBoard(Number(id), whiteBoard);
  }
}
