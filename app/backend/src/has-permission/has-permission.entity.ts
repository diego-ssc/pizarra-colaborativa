import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from 'src/user/user.entity';
import UserGroup from 'src/user-group/user-group.entity';
import Workspace from 'src/workspace/workspace.entity';
import WhiteBoard from 'src/white-board/white-board.entity';

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

  /* The users. */
  @OneToMany(() => User, (user) => user.hasPermissions)
  users: User[];

  /* The user groups. */
  @OneToMany(() => UserGroup, (userGroup) => userGroup.hasPermissions)
  userGroups: UserGroup[];

  /* The workspaces. */
  @OneToMany(() => Workspace, (workspace) => workspace.hasPermissions)
  workspaces: Workspace[];

  /* The whiteBoards. */
  @OneToMany(() => WhiteBoard, (whiteBoard) => whiteBoard.hasPermissions)
  whiteBoards: WhiteBoard[];
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
