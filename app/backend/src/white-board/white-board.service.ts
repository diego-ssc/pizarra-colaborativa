import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WhiteBoard } from './white-board.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { CreateWhiteBoardDto } from './dto/createWhiteBoardDto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateWhiteBoardDto } from './dto/update-whiteboard.dto';
import { isUUID } from 'class-validator';
import { OrderByOption, WhiteBoardQuery } from './dto/white-board-query';

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
    newWhiteBoard.isPublic = false;
    return await this.whiteBoardRepository.save(newWhiteBoard);
  }

  async getWhiteBoards(query: WhiteBoardQuery) {
    const queryBuilder = this.whiteBoardRepository
      .createQueryBuilder('whiteboard')
      .leftJoinAndSelect('whiteboard.workspace', 'workspace');

    if (query.title) {
      queryBuilder.andWhere('whiteboard.title like :title', {
        title: `%${query.title}%`,
      });
    }

    if (query.orderBy) {
      const order = query.order ? query.order : 'ASC';
      switch (query.orderBy) {
        case OrderByOption.Title:
          queryBuilder.orderBy('whiteboard.title', order);
          break;
        case OrderByOption.LastUpdated:
          queryBuilder.orderBy('whiteboard.updatedAt', order);
          break;
      }
    }

    if (query.workspace) {
      queryBuilder.andWhere('whiteboard.workspace = :workspace', {
        workspace: query.workspace,
      });
    }

    // TODO: Filter by access type (owner or shared)
    console.log(queryBuilder.getQueryAndParameters());
    return await queryBuilder.getMany();
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
