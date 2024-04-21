import { Column, Entity, JoinColumn, ManyToOne,ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import Workspace from '../workspace/workspace.entity';
import HasPermission from 'src/has-permission/has-permission.entity';

@Entity({ name: 'whiteBoard' })
export class WhiteBoard {
  @PrimaryGeneratedColumn()
  whiteBoardId: number;

  @Column({ unique: true })
  title: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Workspace)
  @JoinColumn()
  workspace: Workspace;

  @ManyToMany(() => HasPermission)
  @JoinTable()
  hasPermissions: HasPermission[];
}
export default WhiteBoard;
