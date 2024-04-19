import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'userGroup' })
export class UserGroup {
  @PrimaryGeneratedColumn()
  userGroupId: number;

  @Column({ unique: true })
  name: string;
}
export default UserGroup;
