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
import { HasPermissionService } from 'src/has-permission/has-permission.service';
import { HasPermission } from 'src/has-permission/has-permission.entity';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class WhiteBoardService {
  constructor(
    @InjectRepository(WhiteBoard)
    private whiteBoardRepository: Repository<WhiteBoard>,
    private hasPermissionService: HasPermissionService,
    private datasource: DataSource,
  ) {}

  async createWhiteBoard(whiteBoard: CreateWhiteBoardDto, user: User) {
    if (!whiteBoard || !whiteBoard.title) {
      return new HttpException(
        'Whiteboard title is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    let newWhiteBoard = this.whiteBoardRepository.create(whiteBoard);
    newWhiteBoard.isPublic = false;
    newWhiteBoard = await this.datasource
      .getRepository(WhiteBoard)
      .save(newWhiteBoard);

    /* Permission linked with the whiteboard creator. */
    const permission = this.datasource.getRepository(HasPermission).create();
    permission.action = HasPermission.Action.ADMIN;
    permission.user = user;
    permission.whiteBoard = newWhiteBoard;
    await this.datasource.getRepository(HasPermission).save(permission);

    return newWhiteBoard;
  }

  async getWhiteBoards(query: WhiteBoardQuery, userId: number) {
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
    const whiteboards = await queryBuilder.getMany();

    const permitted = async (whiteboard) =>
      this.hasPermissionService.hasUserAccessToWhiteboard(
        userId,
        whiteboard.whiteBoardId,
      );

    const filteredWhiteboards: Partial<WhiteBoard> &
      { role: HasPermission.Action }[] = [];

    for (let i = 0; i < whiteboards.length; i++) {
      const whiteboard = whiteboards[i];
      const action = await permitted(whiteboard);
      if (action !== HasPermission.Action.DENIED)
        filteredWhiteboards.push({ ...whiteboard, role: action });
    }

    return filteredWhiteboards;
  }

  async getWhiteBoardById(id: string, userId: number) {
    if (!isUUID(id)) {
      throw new BadRequestException('invalid id format');
    }
    const whiteboard = await this.whiteBoardRepository.findOne({
      where: {
        whiteBoardId: id,
      },
    });

    if (!whiteboard) throw new NotFoundException('whiteboard not found');

    const hasPermission =
      await this.hasPermissionService.hasUserAccessToWhiteboard(
        userId,
        whiteboard.whiteBoardId,
      );

    if (hasPermission !== HasPermission.Action.DENIED) {
      return whiteboard;
    } else {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }
  }

  async deleteWhiteBoardById(id: string, userId: number) {
    if (!isUUID(id)) {
      throw new BadRequestException('invalid id format');
    }
    const whiteboard = await this.whiteBoardRepository.findOne({
      where: {
        whiteBoardId: id,
      },
    });

    if (!whiteboard)
      return new HttpException('Whiteboard not found', HttpStatus.NOT_FOUND);

    const hasPermission =
      await this.hasPermissionService.hasUserAccessToWhiteboard(
        userId,
        whiteboard.whiteBoardId,
      );

    if (hasPermission !== HasPermission.Action.ADMIN)
      return new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);

    await this.whiteBoardRepository.remove(whiteboard);
    return whiteboard;
  }

  async updateWhiteBoard(
    id: string,
    whiteBoard: UpdateWhiteBoardDto,
    userId: number,
  ) {
    if (!isUUID(id)) {
      return new HttpException('Whiteboard not found', HttpStatus.NOT_FOUND);
    }
    const whiteboardFound = await this.whiteBoardRepository.findOne({
      where: {
        whiteBoardId: id,
      },
    });

    if (!whiteboardFound)
      return new HttpException('Whiteboard not found', HttpStatus.NOT_FOUND);

    const hasPermission =
      await this.hasPermissionService.hasUserAccessToWhiteboard(
        userId,
        whiteboardFound.whiteBoardId,
      );

    if (hasPermission !== HasPermission.Action.ADMIN)
      return new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);

    const updateWhiteBoard = Object.assign(whiteboardFound, whiteBoard);
    return this.whiteBoardRepository.save(updateWhiteBoard);
  }
}
