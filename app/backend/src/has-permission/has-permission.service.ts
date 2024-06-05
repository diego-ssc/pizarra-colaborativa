import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HasPermission } from './has-permission.entity';
import { In, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import WhiteBoard from '../white-board/white-board.entity';
import Workspace from '../workspace/workspace.entity';
import { AddPermissionDto } from './dto/add-permission.dto';

@Injectable()
export class HasPermissionService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private datasource: DataSource,
  ) { }

  /**
   * Returns true if the user has access to the whiteboard; false, otherwise.
   * @param {number} userId - The id of the user.
   * @param {string} whiteBoardId - The id of the the whiteboard.
   */
  async hasUserAccessToWhiteboard(
    userId: number,
    whiteBoardId: string,
  ): Promise<HasPermission.Action> {
    /* Find the whiteboard by id. */
    const whiteboard = await this.datasource.getRepository(WhiteBoard).findOne({
      where: {
        whiteBoardId: whiteBoardId,
      },
      relations: { workspace: true },
    });

    /* Whiteboard not found. */
    if (!whiteboard) return HasPermission.Action.DENIED;

    /* Public Access. */
    if (whiteboard.isPublic) return HasPermission.Action.WRITE;

    /* Find the user and their associated permissions */
    const user = await this.datasource.getRepository(User).findOne({
      where: {
        userId: userId,
      },
      relations: { hasPermissions: { whiteBoard: true, workspace: true } },
    });

    /* User not found. */
    if (!user) return HasPermission.Action.DENIED;

    /* User has no permissions. */
    if (!user.hasPermissions) return HasPermission.Action.DENIED;

    /* Check if the user's permissions include access to the specified
       whiteboard. */
    const hasAccess = user.hasPermissions.filter(
      (perm) => perm.whiteBoard.whiteBoardId === whiteBoardId,
    )[0];

    if (!whiteboard.workspace) {
      if (!hasAccess) return HasPermission.Action.DENIED;

      return hasAccess.action;
    }
    /* Check if the user's permissions include access to the associated workspace. */
    const hasAccessWorkspace = user.hasPermissions.filter(
      (perm) => perm.workspace.workspaceId === whiteboard.workspace.workspaceId,
    )[0];

    if (!hasAccessWorkspace) {
      if (!hasAccess) return HasPermission.Action.DENIED;

      return hasAccess.action;
    }

    if (!hasAccess)
      return hasAccessWorkspace.action;

    if (hasAccess.action === HasPermission.Action.ADMIN ||
      hasAccessWorkspace.action === HasPermission.Action.ADMIN)
      return HasPermission.Action.ADMIN;

    if (hasAccess.action === HasPermission.Action.WRITE ||
      hasAccessWorkspace.action === HasPermission.Action.WRITE)
      return HasPermission.Action.WRITE;

    if (hasAccess.action === HasPermission.Action.READ ||
      hasAccessWorkspace.action === HasPermission.Action.READ)
      return HasPermission.Action.READ;

    return HasPermission.Action.DENIED;
  }

  /**
   * Returns true if the user has access to the workspace; false, otherwise.
   * @param {number} userId - The id of the user.
   * @param {number} workspaceId - The id of the the workspace.
   */
  async hasUserAccessToWorkspace(
    userId: number,
    workspaceId: number,
  ): Promise<HasPermission.Action> {
    /* Find the workspace by id. */
    const workspace = await this.datasource.getRepository(Workspace).findOne({
      where: {
        workspaceId: workspaceId,
      },
    });

    /* Whiteboard not found. */
    if (!workspace) return HasPermission.Action.DENIED;

    /* Find the user and their associated permissions */
    const user = await this.datasource.getRepository(User).findOne({
      where: {
        userId: userId,
      },
      relations: { hasPermissions: { workspace: true } },
    });

    /* User not found. */
    if (!user) return HasPermission.Action.DENIED;

    /* User has no permissions. */
    if (!user.hasPermissions) return HasPermission.Action.DENIED;

    /* Check if the user's permissions include access to the specified
       workspace.
       workspace.hasPermission.users.some... is needed too. */
    const hasAccess = user.hasPermissions.filter(
      (perm) => perm.workspace.workspaceId === workspaceId,
    )[0];

    if (!hasAccess) return HasPermission.Action.DENIED;

    return hasAccess.action;
  }

  /**
   * Adds permission for multiple users to a certain whiteboard.
   * @param {string} whiteBoardId - The id of the whiteboard.
   * @param {HasPermission.Acion} action - The permission action.
   */
  async addBulkUserPermissionToWhiteboard(
    whiteBoardID: string,
    permissionDto: AddPermissionDto,
  ) {
    const users = await this.userRepository.find({
      where: { email: In(permissionDto.emails) },
    });

    if (users.length !== permissionDto.emails.length) {
      throw new NotFoundException('An email was not found');
    }

    return Promise.all(
      users.map((user) =>
        this.addUserPermissionToWhiteboard(
          user.userId,
          whiteBoardID,
          permissionDto.action,
        ),
      ),
    );
  }

  /**
   * Adds a user permission to a certain whiteboard.
   * @param {number} userId - The id of the user.
   * @param {string} whiteBoardId - The id of the whiteboard.
   * @param {HasPermission.Acion} action - The permission action.
   */
  async addUserPermissionToWhiteboard(
    userId: number,
    whiteBoardId: string,
    action: HasPermission.Action,
  ) {
    const user = await this.datasource.getRepository(User).findOne({
      where: {
        userId: userId,
      },
      relations: ['hasPermissions'],
    });

    const whiteboard = await this.datasource.getRepository(WhiteBoard).findOne({
      where: {
        whiteBoardId: whiteBoardId,
      },
    });

    if (!user || !whiteboard)
      throw new HttpException(
        'Invalid user or whiteboard ID',
        HttpStatus.NOT_FOUND,
      );

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
      await this.datasource.getRepository(HasPermission).save(hasPermission);
    } else {
      hasPermission = this.datasource.getRepository(HasPermission).create();
      hasPermission.action = action;
      hasPermission.user = user;
      hasPermission.whiteBoard = whiteboard;

      await this.datasource.getRepository(HasPermission).save(hasPermission);
    }
  }

  /**
   * Deletes the permission of the user with id userId to the whiteboard with id
   * whiteboardId.
   * @param {number} userId - The id of the user.
   * @param {string} whiteboardId - The id of the whiteboard.
   */
  async deleteUserPermissionFromWhiteboard(
    userId: number,
    whiteboardId: string,
  ) {
    const user = await this.datasource.getRepository(User).findOne({
      where: {
        userId: userId,
      },
    });

    const whiteboard = await this.datasource.getRepository(WhiteBoard).findOne({
      where: {
        whiteBoardId: whiteboardId,
      },
    });

    if (user && user.hasPermissions)
      if (
        user.hasPermissions.some(
          (perm) => perm.whiteBoard.whiteBoardId === whiteboardId,
        )
      )
        /* Check if the whiteboardId matches the associated whiteboard */
        /* Remove the association between user and the specific whiteboard */
        user.hasPermissions = user.hasPermissions.filter(
          (perm) => perm.whiteBoard.whiteBoardId !== whiteboardId,
        );

    if (whiteboard && whiteboard.hasPermissions)
      if (whiteboard.hasPermissions.some((perm) => perm.user.userId === userId))
        /* Check if the userId matches the associated user */
        /* Remove the association between user and the specific whiteboard */
        whiteboard.hasPermissions = whiteboard.hasPermissions.filter(
          (perm) => perm.user.userId !== userId,
        );

    const hasPermission = await this.datasource
      .getRepository(HasPermission)
      .findOne({
        where: {
          user: { userId: userId },
          whiteBoard: { whiteBoardId: whiteboardId },
        },
      });

    if (hasPermission) {
      await this.datasource.getRepository(HasPermission).remove(hasPermission);
    }
  }

  /**
   * Adds a user permission to a certain workspace.
   * @param {number} userId - The id of the user.
   * @param {string} workspaceId - The id of the workspace.
   * @param {HasPermission.Acion} action - The permission action.
   */
  async addUserPermissionToWorkspace(
    userId: number,
    workspaceId: number,
    action: HasPermission.Action,
  ) {
    const user = await this.datasource.getRepository(User).findOne({
      where: {
        userId: userId,
      },
      relations: ['hasPermissions'],
    });

    const workspace = await this.datasource.getRepository(Workspace).findOne({
      where: {
        workspaceId: workspaceId,
      },
    });

    if (!user || !workspace)
      return new HttpException(
        'Invalid user or workspace ID',
        HttpStatus.NOT_FOUND,
      );

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
      hasPermission = this.datasource.getRepository(HasPermission).create();
      hasPermission.action = action;
      hasPermission.user = user;
      hasPermission.workspace = workspace;

      /* Initialize arrays. */
      if (!user.hasPermissions) user.hasPermissions = [];
      if (!workspace.hasPermissions) workspace.hasPermissions = [];

      user.hasPermissions.push(hasPermission);
      workspace.hasPermissions.push(hasPermission);
      await this.datasource.getRepository(HasPermission).save(hasPermission);

      await this.datasource.getRepository(User).save(user);
      await this.datasource.getRepository(Workspace).save(workspace);
    }
  }

  /**
   * Deletes the permission of the user with id userId to the workspace with id
   * workspaceId.
   * @param {number} userId - The id of the user.
   * @param {number} workspaceId - The id of the workspace.
   */
  async deleteUserPermissionFromWorkspace(userId: number, workspaceId: number) {
    const user = await this.datasource.getRepository(User).findOne({
      where: {
        userId: userId,
      },
    });

    const workspace = await this.datasource.getRepository(Workspace).findOne({
      where: {
        workspaceId: workspaceId,
      },
    });

    if (user && user.hasPermissions)
      if (
        user.hasPermissions.some(
          (perm) => perm.workspace.workspaceId === workspaceId,
        )
      )
        /* Check if the workspaceId matches the associated workspace */
        /* Remove the association between user and the specific workspace */
        user.hasPermissions = user.hasPermissions.filter(
          (perm) => perm.workspace.workspaceId !== workspaceId,
        );

    if (workspace && workspace.hasPermissions)
      if (workspace.hasPermissions.some((perm) => perm.user.userId === userId))
        /* Check if the userId matches the associated user */
        /* Remove the association between user and the specific workspace */
        workspace.hasPermissions = workspace.hasPermissions.filter(
          (perm) => perm.user.userId !== userId,
        );

    const hasPermission = await this.datasource
      .getRepository(HasPermission)
      .findOne({
        where: {
          user: { userId: userId },
          workspace: { workspaceId: workspaceId },
        },
      });

    if (hasPermission) {
      await this.datasource.getRepository(HasPermission).remove(hasPermission);
    }
  }

  /**
   * Changes the default permission (public or private) of the whiteboard.
   * @param {string} whiteBoardId - the id of the whiteboard.
   * @param {boolean} isPublic - the new default permission.
   */
  async changeWhiteboardDefaultPermission(
    whiteBoardId: string,
    isPublic: boolean,
  ) {
    const whiteboard = await this.datasource.getRepository(WhiteBoard).findOne({
      where: {
        whiteBoardId: whiteBoardId,
      },
    });

    if (whiteboard) whiteboard.isPublic = isPublic;
    else
      return new HttpException('Invalid whiteboard ID', HttpStatus.NOT_FOUND);

    this.datasource.getRepository(WhiteBoard).save(whiteboard);
  }
}
