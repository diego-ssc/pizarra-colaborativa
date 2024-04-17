import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  workspaceId: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  owner: User;

  @Column()
  members: User[];

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
export default Workspace;
