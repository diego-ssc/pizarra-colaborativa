import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import WhiteBoard from 'src/white-board/white-board.entity';
import HasPermission from 'src/has-permission/has-permission.entity';
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

  @ManyToMany(() => HasPermission)
  @JoinTable()
  hasPermissions: HasPermission[];
}
export default Workspace;
