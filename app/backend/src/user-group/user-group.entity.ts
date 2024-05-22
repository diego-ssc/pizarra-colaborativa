import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../user/user.entity';
import HasPermission from '../has-permission/has-permission.entity';

@Entity({ name: 'userGroup' })
export class UserGroup {
  @PrimaryGeneratedColumn()
  userGroupId: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToOne(() => HasPermission, (hasPermissions) => hasPermissions.userGroups)
  hasPermissions: HasPermission;
}
export default UserGroup;
