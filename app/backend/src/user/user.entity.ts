import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserGroup } from '../user-group/user-group.entity';
import HasPermission from 'src/has-permission/has-permission.entity';

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

  @ManyToMany(() => UserGroup)
  @JoinTable()
  userGroups: UserGroup[];

  @ManyToMany(() => HasPermission)
  @JoinTable()
  hasPermissions: HasPermission[];
}

export default User;
