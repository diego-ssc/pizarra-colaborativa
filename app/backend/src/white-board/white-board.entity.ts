import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Workspace from '../workspace/workspace.entity';
import HasPermission from 'src/has-permission/has-permission.entity';

@Entity({ name: 'whiteBoard' })
export class WhiteBoard {
  @PrimaryGeneratedColumn('uuid')
  whiteBoardId: string;

  @Column()
  title: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Workspace)
  @JoinColumn()
  workspace: Workspace;

  @ManyToOne(() => HasPermission, (hasPermissions) => hasPermissions.whiteBoards)
  hasPermissions: HasPermission;
}
export default WhiteBoard;
