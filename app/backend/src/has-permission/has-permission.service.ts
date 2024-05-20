import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HasPermission } from './has-permission.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateHasPermissionDto } from './dto/create-has-permissionDto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateHasPermissionDto } from './dto/update-has-permissionDto.dto';
import { User } from '../user/user.entity';
import WhiteBoard from 'src/white-board/white-board.entity';
import Workspace from 'src/workspace/workspace.entity';

@Injectable()
export class HasPermissionService {
  constructor(
    @InjectRepository(HasPermission)
    private hasPermissionRepository: Repository<HasPermission>,
    private datasource: DataSource
  ) { }

  async createHasPermission(hasPermission: CreateHasPermissionDto) {
    const hasPermissionFound = await this.hasPermissionRepository.findOne({
      where: {
        action: hasPermission.action,
      },
    });
    if (hasPermissionFound) {
      return new HttpException(
        'Permission already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newHasPermission = this.hasPermissionRepository.create(hasPermission);
    this.hasPermissionRepository.save(newHasPermission);
  }

  async getHasPermissions() {
    return this.hasPermissionRepository.find();
  }

  async getHasPermissionById(id: number) {
    const hasPermission = await this.hasPermissionRepository.findOne({
      where: {
        idPermission: id,
      },
    });
    if (hasPermission) {
      return hasPermission;
    }
    throw new NotFoundException('Could not find the permission');
  }

  async deleteHasPermissionById(id: number) {
    const hasPermission = await this.hasPermissionRepository.findOne({
      where: {
        idPermission: id,
      },
    });
    if (!hasPermission) {
      return new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    await this.hasPermissionRepository.remove(hasPermission);
    return hasPermission;
  }

  async updateHasPermission(id: number, hasPermission: UpdateHasPermissionDto) {
    const hasPermissionFound = await this.hasPermissionRepository.findOne({
      where: {
        idPermission: id,
      },
    });

    if (!hasPermissionFound) {
      return new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    const updateHasPermission = Object.assign(hasPermissionFound, hasPermission,);
    return this.hasPermissionRepository.save(updateHasPermission);
  }

  /**
   *
   */
  async hasUserAccessToWhiteboard(userId: number, whiteBoardId: number): Promise<boolean> {
    const whiteboard = await this.datasource
      .getRepository(WhiteBoard)
      .findOne({
        where: {
          whiteBoardId: whiteBoardId,
        },
      });

    if (whiteboard.isPublic)
      return true;

    const user = await this.datasource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.hasPermissions', 'hasPermission')
      .where('user.userId = :userId', { userId })
      .andWhere('hasPermission.whiteBoards.whireBoardId IN (:...whiteboardIds)', { whiteboardIds: [whiteBoardId] })
      .getOne();

    return !!user; // Check if user exists
  }

  /**
   *
   */
  async hasUserAccessToWorkspace(userId: number, workspaceId: number): Promise<boolean> {
    const user = await this.datasource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.hasPermissions', 'hasPermission')
      .where('user.userId = :userId', { userId })
      .andWhere('hasPermission.workspaces.workspaceId IN (:...workspaceIds)', { workspaceIds: [workspaceId] })
      .getOne();

    return !!user; // Check if user exists
  }

  async addUserPermissionToWhiteboard(userId: number, whiteBoardId: number, action: HasPermission.Action) {
    const user = await this.datasource
      .getRepository(User)
      .findOne({
        where: {
          userId: userId,
        },
      });


    const whiteboard = await this.datasource
      .getRepository(WhiteBoard)
      .findOne({
        where: {
          whiteBoardId: whiteBoardId,
        },
      });

    if (!user || !whiteboard)
      return new HttpException('Invalid user or whiteboard ID', HttpStatus.NOT_FOUND);

    let hasPermission = await this.hasPermissionRepository.findOne({
      where: {
        users: user,
        whiteBoards: whiteboard,
      },
    });

    if (hasPermission) {
      hasPermission.action = action;
    } else {
      hasPermission = new HasPermission();
      hasPermission.action = action;
      hasPermission.users = [user];
      hasPermission.whiteBoards = [whiteboard];
    }

    await this.hasPermissionRepository.save(hasPermission);
  }

  /**
   * Deletes the permission
   */
  async deleteUserPermissionFromWhiteboard(userId: number, whiteboardId: number) {
    const hasPermission = await this.hasPermissionRepository.findOne({
      where: {
        users: { userId: userId },
        whiteBoards: { whiteBoardId: whiteboardId },
      },
    });

    if (hasPermission) {
      await this.hasPermissionRepository.delete(hasPermission);
    }
  }


  async addUserPermissionToWorkspace(userId: number, workspaceId: number, action: HasPermission.Action) {
    const user = await this.datasource
      .getRepository(User)
      .findOne({
        where: {
          userId: userId,
        },
      });

    const workspace = await this.datasource
      .getRepository(Workspace)
      .findOne({
        where: {
          workspaceId: workspaceId,
        },
      });

    if (!user || !workspace)
      return new HttpException('Invalid user or whiteboard ID', HttpStatus.NOT_FOUND);

    let hasPermission = await this.hasPermissionRepository.findOne({
      where: {
        users: user,
        workspaces: workspace,
      },
    });

    if (hasPermission) {
      hasPermission.action = action;
    } else {
      hasPermission = new HasPermission();
      hasPermission.action = action;
      hasPermission.users = [user];
      hasPermission.workspaces = [workspace];
    }

    await this.hasPermissionRepository.save(hasPermission);
  }

  /**
   * Deletes the permission
   */
  async deleteUserPermissionFromWorkspace(userId: number, workspaceId: number) {
    const hasPermission = await this.hasPermissionRepository.findOne({
      where: {
        users: { userId: userId },
        workspaces: { workspaceId: workspaceId },
      },
    });

    if (hasPermission) {
      await this.hasPermissionRepository.delete(hasPermission);
    }
  }

  async changeWhiteboardDefaultPermission(whiteBoardId: number, isPublic: boolean) {
    const whiteboard = await this.datasource
      .getRepository(WhiteBoard)
      .findOne({
        where: {
          whiteBoardId: whiteBoardId,
        },
      });

    if (whiteboard) {
      whiteboard.isPublic = isPublic;
      await this.datasource
        .getRepository(WhiteBoard)
        .save(whiteboard);
    } else {
      return new HttpException('Invalid whiteboard ID', HttpStatus.NOT_FOUND);
    }
  }

}
