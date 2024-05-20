import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import WhiteBoard from 'src/white-board/white-board.entity';
import HasPermission from 'src/has-permission/has-permission.entity';

@Entity({ name: 'whiteboardPublicAccess' })
export class WhiteboardPublicAccess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accessLevel: HasPermission.Action;

  @OneToOne(() => WhiteBoard, (whiteboard) => whiteboard.publicAccess)
  whiteboard: WhiteBoard;
}
