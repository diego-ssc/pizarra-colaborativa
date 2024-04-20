import { Column, Entity } from 'typeorm';

@Entity({ name: 'hasPermission' })
export class HasPermission {
  @Column()
  action: string;
}
export default HasPermission;
