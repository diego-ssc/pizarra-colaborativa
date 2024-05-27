import { IsEmail } from 'class-validator';
import HasPermission from '../has-permission.entity';

export class AddPermissionDto {
  action: HasPermission.Action;

  @IsEmail({}, { each: true })
  emails: string[];
}
