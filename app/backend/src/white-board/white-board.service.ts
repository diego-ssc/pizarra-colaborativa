import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WhiteBoard } from './white-board.entity';
import { Repository } from 'typeorm';
import { CreateWhiteBoardDto } from './dto/createWhiteBoardDto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateWhiteBoardDto } from './dto/update-whiteboard.dto';
import { isUUID } from 'class-validator';
@Injectable()
export class WhiteBoardService {
  constructor(
    @InjectRepository(WhiteBoard)
    private whiteBoardRepository: Repository<WhiteBoard>,
  ) { }

  async createWhiteBoard(whiteBoard: CreateWhiteBoardDto) {
    if (!whiteBoard || !whiteBoard.title) {
      return new HttpException(
        'Whiteboard title is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newWhiteBoard = this.whiteBoardRepository.create(whiteBoard);
    newWhiteBoard.isPublic = true;
    return await this.whiteBoardRepository.save(newWhiteBoard);
  }

  async getWhiteBoards() {
    return this.whiteBoardRepository.find();
  }

  async getWhiteBoardById(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('invalida id format');
    }
    const whiteboard = await this.whiteBoardRepository.findOne({
      where: {
        whiteBoardId: id,
      },
    });
    if (whiteboard) {
      return whiteboard;
    }
    throw new NotFoundException('whiteboard not found');
  }

  async deleteWhiteBoardById(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('invalida id format');
    }
    const whiteboard = await this.whiteBoardRepository.findOne({
      where: {
        whiteBoardId: id,
      },
    });
    if (!whiteboard) {
      return new HttpException('Whiteboard not found', HttpStatus.NOT_FOUND);
    }
    await this.whiteBoardRepository.remove(whiteboard);
    return whiteboard;
  }

  async updateWhiteBoard(id: string, whiteBoard: UpdateWhiteBoardDto) {
    if (!isUUID(id)) {
      return new HttpException('Whiteboard not found', HttpStatus.NOT_FOUND);
    }
    const whiteboardFound = await this.whiteBoardRepository.findOne({
      where: {
        whiteBoardId: id,
      },
    });

    if (!whiteboardFound) {
      return new HttpException('Whiteboard not found', HttpStatus.NOT_FOUND);
    }
    const updateWhiteBoard = Object.assign(whiteboardFound, whiteBoard);
    return this.whiteBoardRepository.save(updateWhiteBoard);
  }
}
