import { Module } from '@nestjs/common';
import { HasPermissionService } from './has-permission.service';
import { HasPermissionController } from './has-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import HasPermission from './has-permission.entity';
@Module({
  imports: [TypeOrmModule.forFeature([HasPermission])],
  providers: [HasPermissionService],
  controllers: [HasPermissionController],
  exports: [HasPermissionService],
})
export class HasPermissionModule { }
