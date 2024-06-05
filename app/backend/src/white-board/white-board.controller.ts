import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { CreateWhiteBoardDto } from './dto/createWhiteBoardDto.dto';
import { WhiteBoardService } from './white-board.service';
import WhiteBoard from './white-board.entity';
import { UpdateWhiteBoardDto } from './dto/update-whiteboard.dto';
import { WhiteBoardQuery } from './dto/white-board-query';

@Controller('whiteboard')
export class WhiteBoardController {
  constructor(private whiteBoardService: WhiteBoardService) {}

  @Get()
  getWhiteBoards(@Query() query: WhiteBoardQuery, @Req() request) {
    return this.whiteBoardService.getWhiteBoards(query, request.user.userId);
  }

  @Get(':id')
  getWhiteBoardById(@Param('id') id: string, @Req() request) {
    return this.whiteBoardService.getWhiteBoardById(id, request.user.userId);
  }

  @Post()
  createWhiteBoard(@Body() newWhiteBoard: CreateWhiteBoardDto, @Req() request) {
    return this.whiteBoardService.createWhiteBoard(newWhiteBoard, request.user);
  }

  @Delete(':id')
  deleteWhiteBoardById(@Param('id') id: string, @Req() request) {
    this.whiteBoardService.deleteWhiteBoardById(id, request.user.userId);
  }

  @Patch(':id')
  updateWhiteBoard(
    @Param('id') id: string,
    @Body() whiteBoard: UpdateWhiteBoardDto,
    @Req() request,
  ) {
    return this.whiteBoardService.updateWhiteBoard(
      id,
      whiteBoard,
      request.user.userId,
    );
  }
}
