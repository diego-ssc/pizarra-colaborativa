import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/createWorkspaceDto.dto';
import { WorkspaceService } from './workspace.service';
import Workspace from './workspace.entity';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Get()
  getWorkspaces(): Promise<Workspace[]> {
    return this.workspaceService.getWorkspaces();
  }

  @Get(':id')
  getWorkspaceById(@Param() id: string): Promise<Workspace> {
    return this.workspaceService.getWorkspaceById(Number(id));
  }

  @Post()
  createWorkspace(@Body() newWorkspace: CreateWorkspaceDto) {
    return this.workspaceService.createWorkspace(newWorkspace);
  }
}
