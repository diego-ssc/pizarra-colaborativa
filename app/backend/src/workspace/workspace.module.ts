import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './workspace.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Workspace])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule { }
