import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity
class WhiteBoard{
  @PrimaryGeneratedColumn()
  whiteBoardId: number;

  @Column()
  title: string;

  @Column()
  documentBlob: string;

  @Column({type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}
