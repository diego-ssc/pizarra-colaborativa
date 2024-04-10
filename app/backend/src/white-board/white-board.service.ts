import { Injectable } from '@nestjs/common';
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

  createWhiteBoard(whiteBoard: CreateWhiteBoardDto) {
    const newWhiteBoard = this.whiteBoardRepository.create(whiteBoard);
    this.whiteBoardRepository.save(newWhiteBoard);
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
      return null;
    }
    await this.whiteBoardRepository.remove(whiteboard);
    return whiteboard;
  }

  async updateWhiteBoard(id: number, whiteBoard: UpdateWhiteBoardDto) {
    return this.whiteBoardRepository.update(id, whiteBoard);
  }
}
