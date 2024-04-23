import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';
import HasPermission from 'src/has-permission/has-permission.entity';

@Entity({ name: 'userGroup' })
export class UserGroup {
  @PrimaryGeneratedColumn()
  userGroupId: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToMany(() => HasPermission)
  @JoinTable()
  hasPermissions: HasPermission[];
}
export default UserGroup;
