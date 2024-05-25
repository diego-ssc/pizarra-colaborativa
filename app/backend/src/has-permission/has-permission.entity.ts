import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user.entity';
import UserGroup from '../user-group/user-group.entity';
import Workspace from '../workspace/workspace.entity';
import WhiteBoard from '../white-board/white-board.entity';

/**
 * The HasPermission class. it defines the permission relation between
 * User/UserGroup and Workspace/Whiteboard.
 */
@Entity({ name: 'hasPermission' })
export class HasPermission {
  /* Id of permission. */
  @PrimaryGeneratedColumn()
  idPermission: number;

  /* The type of permission. */
  @Column()
  action: HasPermission.Action;

  /* The user. */
  @ManyToOne(() => User, (user) => user.hasPermissions, {
    cascade: true, onDelete: "CASCADE"
  })
  user: User;

  /* The user groups. */
  @ManyToOne(() => UserGroup, (userGroup) => userGroup.hasPermissions, {
    cascade: true, onDelete: "CASCADE"
  })
  userGroup: UserGroup;

  /* The workspaces. */
  @ManyToOne(() => Workspace, (workspace) => workspace.hasPermissions, {
    cascade: true, onDelete: "CASCADE"
  })
  workspace: Workspace;

  /* The whiteBoards. */
  @ManyToOne(() => WhiteBoard, (whiteBoard) => whiteBoard.hasPermissions, {
    cascade: true, onDelete: "CASCADE"
  })
  whiteBoard: WhiteBoard;
}

/**
 * The HasPermission.Action enum. It defines the available type of permissions.
 */
export namespace HasPermission {
  export enum Action {
    /* The user can read the document. */
    READ = "Read",
    /* The user can write on the document. */
    WRITE = "Write",
    /* The user is the administrator of the document. */
    ADMIN = "Admin"
  }
}

export default HasPermission;
