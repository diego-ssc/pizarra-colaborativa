import { Module } from '@nestjs/common';
import { HasPermissionService } from './has-permission.service';
import { HasPermissionController } from './has-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import HasPermission from './has-permission.entity';
import User from 'src/user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([HasPermission, User])],
  providers: [HasPermissionService],
  controllers: [HasPermissionController],
  exports: [HasPermissionService],
})
export class HasPermissionModule {}
