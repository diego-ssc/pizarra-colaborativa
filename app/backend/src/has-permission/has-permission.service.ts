import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HasPermission } from './has-permission.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateHasPermissionDto } from './dto/create-has-permissionDto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateHasPermissionDto } from './dto/update-has-permissionDto.dto';
import { User } from '../user/user.entity';
import WhiteBoard from '../white-board/white-board.entity';
import Workspace from '../workspace/workspace.entity';

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
   * Returns true if the user has access to the whiteboard; false, otherwise.
   * @param {number} userId - The id of the user.
   * @param {string} whiteBoardId - The id of the the whiteboard.
   */
  async hasUserAccessToWhiteboard(userId: number, whiteBoardId: string): Promise<boolean> {
    /* Find the whiteboard by id. */
    const whiteboard = await this.datasource
      .getRepository(WhiteBoard)
      .findOne({
        where: {
          whiteBoardId: whiteBoardId,
        },
      });

    /* Whiteboard not found. */
    if (!whiteboard)
      return false;

    /* Public Access. */
    if (whiteboard.isPublic)
      return true;

    /* Find the user and their associated permissions */
    const user = await this.datasource
      .getRepository(User)
      .findOne({
        where: {
          userId: userId,
        },
        relations: { hasPermissions: { whiteBoard: true } },
      });

    /* User not found. */
    if (!user)
      return false;

    /* User has no permissions. */
    if (!user.hasPermissions)
      return false;

    /* Check if the user's permissions include access to the specified
       whiteboard.
       whiteboard.hasPermission.users.some... is needed too. */
    const hasAccess = user.hasPermissions
      .some(perm => perm.whiteBoard.whiteBoardId == whiteBoardId);

    return hasAccess;
  }

  /**
   * Returns true if the user has access to the workspace; false, otherwise.
   * @param {number} userId - The id of the user.
   * @param {number} workspaceId - The id of the the workspace.
   */
  async hasUserAccessToWorkspace(userId: number, workspaceId: number): Promise<boolean> {
    /* Find the workspace by id. */
    const workspace = await this.datasource
      .getRepository(Workspace)
      .findOne({
        where: {
          workspaceId: workspaceId,
        },
      });

    /* Whiteboard not found. */
    if (!workspace)
      return false;

    /* Find the user and their associated permissions */
    const user = await this.datasource
      .getRepository(User)
      .findOne({
        where: {
          userId: userId,
        },
        relations: { hasPermissions: { workspace: true } },
      });

    /* User not found. */
    if (!user)
      return false;

    /* User has no permissions. */
    if (!user.hasPermissions)
      return false;

    /* Check if the user's permissions include access to the specified
       workspace.
       workspace.hasPermission.users.some... is needed too. */
    const hasAccess = user.hasPermissions
      .some(perm => perm.workspace.workspaceId === workspaceId);

    return hasAccess;
  }

  /**
   * Adds a user permission to a certain whiteboard.
   * @param {number} userId - The id of the user.
   * @param {string} whiteBoardId - The id of the whiteboard.
   * @param {HasPermission.Acion} action - The permission action.
   */
  async addUserPermissionToWhiteboard(userId: number, whiteBoardId: string, action: HasPermission.Action) {
    const user = await this.datasource
      .getRepository(User)
      .findOne({
        where: {
          userId: userId,
        },
        relations: ['hasPermissions'],
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

    let hasPermission = await this.datasource
      .getRepository(HasPermission)
      .findOne({
        where: {
          user: { userId: userId },
          whiteBoard: { whiteBoardId: whiteBoardId },
        },
      });

    if (hasPermission) {
      hasPermission.action = action;
    } else {
      hasPermission = this.datasource
        .getRepository(HasPermission)
        .create();
      hasPermission.action = action;
      hasPermission.user = user;
      hasPermission.whiteBoard = whiteboard;

      /* Initialize arrays. */
      if (!user.hasPermissions)
        user.hasPermissions = [];
      if (!whiteboard.hasPermissions)
        whiteboard.hasPermissions = [];

      user.hasPermissions.push(hasPermission);
      whiteboard.hasPermissions.push(hasPermission);
      await this.datasource
        .getRepository(HasPermission)
        .save(hasPermission);

      await this.datasource
        .getRepository(User)
        .save(user);
      await this.datasource
        .getRepository(WhiteBoard)
        .save(whiteboard);
    }
  }

  /**
   * Deletes the permission of the user with id userId to the whiteboard with id
   * whiteboardId.
   * @param {number} userId - The id of the user.
   * @param {string} whiteboardId - The id of the whiteboard.
   */
  async deleteUserPermissionFromWhiteboard(userId: number, whiteboardId: string) {
    const user = await this.datasource
      .getRepository(User)
      .findOne({
        where: {
          userId: userId
        }
      });

    const whiteboard = await this.datasource
      .getRepository(WhiteBoard)
      .findOne({
        where: {
          whiteBoardId: whiteboardId
        }
      });

    if (user && user.hasPermissions)
      /* Check if the whiteboardId matches the associated whiteboard */
      if (user.hasPermissions.some(perm => perm.whiteBoard.whiteBoardId === whiteboardId))
        /* Remove the association between user and the specific whiteboard */
        user.hasPermissions = user.hasPermissions
          .filter(perm => perm.whiteBoard.whiteBoardId !== whiteboardId);

    if (whiteboard && whiteboard.hasPermissions)
      /* Check if the userId matches the associated user */
      if (whiteboard.hasPermissions.some(perm => perm.user.userId === userId))
        /* Remove the association between user and the specific whiteboard */
        whiteboard.hasPermissions = whiteboard.hasPermissions
          .filter(perm => perm.user.userId !== userId);

    const hasPermission = await this.datasource
      .getRepository(HasPermission)
      .findOne({
        where: {
          user: { userId: userId },
          whiteBoard: { whiteBoardId: whiteboardId }
        }
      });

    if (hasPermission) {
      await this.datasource
        .getRepository(HasPermission)
        .remove(hasPermission);
    }
  }

  /**
   * Adds a user permission to a certain workspace.
   * @param {number} userId - The id of the user.
   * @param {string} workspaceId - The id of the workspace.
   * @param {HasPermission.Acion} action - The permission action.
   */
  async addUserPermissionToWorkspace(userId: number, workspaceId: number, action: HasPermission.Action) {
    const user = await this.datasource
      .getRepository(User)
      .findOne({
        where: {
          userId: userId,
        },
        relations: ['hasPermissions'],
      });

    const workspace = await this.datasource
      .getRepository(Workspace)
      .findOne({
        where: {
          workspaceId: workspaceId,
        },
      });

    if (!user || !workspace)
      return new HttpException('Invalid user or workspace ID', HttpStatus.NOT_FOUND);

    let hasPermission = await this.datasource
      .getRepository(HasPermission)
      .findOne({
        where: {
          user: { userId: userId },
          workspace: { workspaceId: workspaceId },
        },
      });

    if (hasPermission) {
      hasPermission.action = action;
    } else {
      hasPermission = this.datasource
        .getRepository(HasPermission)
        .create();
      hasPermission.action = action;
      hasPermission.user = user;
      hasPermission.workspace = workspace;

      /* Initialize arrays. */
      if (!user.hasPermissions)
        user.hasPermissions = [];
      if (!workspace.hasPermissions)
        workspace.hasPermissions = [];

      user.hasPermissions.push(hasPermission);
      workspace.hasPermissions.push(hasPermission);
      await this.datasource
        .getRepository(HasPermission)
        .save(hasPermission);

      await this.datasource
        .getRepository(User)
        .save(user);
      await this.datasource
        .getRepository(Workspace)
        .save(workspace);
    }
  }

  /**
   * Deletes the permission of the user with id userId to the workspace with id
   * workspaceId.
   * @param {number} userId - The id of the user.
   * @param {number} workspaceId - The id of the workspace.
   */
  async deleteUserPermissionFromWorkspace(userId: number, workspaceId: number) {
    const user = await this.datasource
      .getRepository(User)
      .findOne({
        where: {
          userId: userId
        }
      });

    const workspace = await this.datasource
      .getRepository(Workspace)
      .findOne({
        where: {
          workspaceId: workspaceId
        }
      });


    if (user && user.hasPermissions)
      /* Check if the workspaceId matches the associated workspace */
      if (user.hasPermissions.some(perm => perm.workspace.workspaceId === workspaceId))
        /* Remove the association between user and the specific workspace */
        user.hasPermissions = user.hasPermissions
          .filter(perm => perm.workspace.workspaceId !== workspaceId);

    if (workspace && workspace.hasPermissions)
      /* Check if the userId matches the associated user */
      if (workspace.hasPermissions.some(perm => perm.user.userId === userId))
        /* Remove the association between user and the specific workspace */
        workspace.hasPermissions = workspace.hasPermissions
          .filter(perm => perm.user.userId !== userId);

    const hasPermission = await this.datasource
      .getRepository(HasPermission)
      .findOne({
        where: {
          user: { userId: userId },
          workspace: { workspaceId: workspaceId }
        }
      });

    if (hasPermission) {
      await this.datasource
        .getRepository(HasPermission)
        .remove(hasPermission);
    }
  }

  /**
   * Changes the default permission (public or private) of the whiteboard.
   * @param {string} whiteBoardId - the id of the whiteboard.
   * @param {boolean} isPublic - the new default permission.
   */
  async changeWhiteboardDefaultPermission(whiteBoardId: string, isPublic: boolean) {
    const whiteboard = await this.datasource
      .getRepository(WhiteBoard)
      .findOne({
        where: {
          whiteBoardId: whiteBoardId,
        },
      });

    if (whiteboard)
      whiteboard.isPublic = isPublic;
    else
      return new HttpException('Invalid whiteboard ID', HttpStatus.NOT_FOUND);

    this.datasource
      .getRepository(WhiteBoard)
      .save(whiteboard);
  }

}
