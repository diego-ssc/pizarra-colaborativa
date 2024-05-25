import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import WhiteBoard from '../white-board/white-board.entity';
import HasPermission from '../has-permission/has-permission.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  workspaceId: number;

  @Column({ unique: true })
  title: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => WhiteBoard, (WhiteBoard) => WhiteBoard.whiteBoardId)
  whiteBoards: WhiteBoard[];

  @OneToMany(() => HasPermission, (hasPermissions) => hasPermissions.workspace)
  hasPermissions: HasPermission[];
}
export default Workspace;
