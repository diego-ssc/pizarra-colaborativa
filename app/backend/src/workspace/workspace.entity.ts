import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  workspaceId: number;

  @Column()
  tittle: string;

  @Column()
  description: string;

  @Column()
  owner: User;

  @Column()
  members: User[];

  @Column({type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}