import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WhiteBoard } from './white-board.entity';
import { Repository } from 'typeorm';
import { CreateWhiteBoardDto } from './dto/createWhiteBoardDto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateWhiteBoardDto } from './dto/update-whiteboard.dto';
@Injectable()
export class WhiteBoardService {
  constructor(
    @InjectRepository(WhiteBoard)
    private whiteBoardRepository: Repository<WhiteBoard>,
  ) {}

  async createWhiteBoard(whiteBoard: CreateWhiteBoardDto) {
    if (!whiteBoard || !whiteBoard.title) {
      return new HttpException(
        'Whiteboard title is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newWhiteBoard = this.whiteBoardRepository.create(whiteBoard);
    return await this.whiteBoardRepository.save(newWhiteBoard);
  }

  async getWhiteBoards() {
    return this.whiteBoardRepository.find();
  }

  async getWhiteBoardById(id: number) {
    const whiteboard = await this.whiteBoardRepository.findOne({
      where: {
        whiteBoardId: id,
      },
    });
    if (whiteboard) {
      return whiteboard;
    }
    throw new NotFoundException('Could not find the whiteboard');
  }

  async deleteWhiteBoardById(id: number) {
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

  async updateWhiteBoard(id: number, whiteBoard: UpdateWhiteBoardDto) {
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
