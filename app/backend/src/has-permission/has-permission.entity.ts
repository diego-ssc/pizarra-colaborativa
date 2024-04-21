import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from 'src/user/user.entity';
import UserGroup from 'src/user-group/user-group.entity';
import Workspace from 'src/workspace/workspace.entity';
import WhiteBoard from 'src/white-board/white-board.entity';
@Entity({ name: 'hasPermission' })
export class HasPermission {
  @PrimaryGeneratedColumn()
  idPermission: number;

  @Column()
  action: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToMany(() => UserGroup)
  @JoinTable()
  userGroups: UserGroup[];

  @ManyToMany(() => Workspace)
  @JoinTable()
  workspace: Workspace[];

  @ManyToMany(() => WhiteBoard)
  @JoinTable()
  whiteBoard: WhiteBoard[];
}
export default HasPermission;
