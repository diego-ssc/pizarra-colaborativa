import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import Workspace from '../workspace/workspace.entity';
import HasPermission from '../has-permission/has-permission.entity';

@Entity({ name: 'whiteBoard' })
export class WhiteBoard {
  @PrimaryGeneratedColumn('uuid')
  whiteBoardId: string;

  @Column()
  title: string;

  @Column()
  isPublic: boolean;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Workspace, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  workspace: Workspace;

  @ManyToOne(() => HasPermission, (hasPermissions) =>
    hasPermissions.whiteBoards, { cascade: true, onDelete: "CASCADE" })
  hasPermissions: HasPermission;
}
export default WhiteBoard;
