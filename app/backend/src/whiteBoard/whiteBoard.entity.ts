import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
class WhiteBoard {
    @PrimaryGeneratedColumn()
    whiteBoardId: number;

    @Column()
    title: string;

    @Column()
    documentBlob: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}

export default WhiteBoard;
