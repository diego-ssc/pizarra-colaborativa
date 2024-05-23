import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGroup } from '../user-group/user-group.entity';
import HasPermission from '../has-permission/has-permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName1: string;

  @Column({ nullable: true })
  lastmame2: string;

  @Column({ nullable: true })
  profilePic: string;

  @Column({ nullable: true })
  isEmailVerified: boolean;

  @ManyToMany(() => UserGroup)
  @JoinTable()
  userGroups: UserGroup[];

  @ManyToOne(() => HasPermission, (hasPermission) => hasPermission.users, {
    cascade: true, onDelete: "CASCADE"
  })
  hasPermissions: HasPermission;
}

export default User;
