import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName1: string;

  @Column()
  lastmame2: string;

  @Column()
  profilePic: string;

  @Column()
  isEmailVerified: boolean;
}

export default User;
