import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import Workspace from 'src/workspace/workspace.entity';
import HasPermission from 'src/has-permission/has-permission.entity';
import { WhiteboardPublicAccess } from 'src/whiteboard-public-access/whiteboard-public-access.entity'

@Entity({ name: 'whiteBoard' })
export class WhiteBoard {
  @PrimaryGeneratedColumn()
  whiteBoardId: number;

  @Column()
  title: string;

  @OneToOne(() => WhiteboardPublicAccess, (publicAccess) => publicAccess.whiteboard)
  publicAccess?: WhiteboardPublicAccess;

  @Column()
  isPublic: boolean;

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
