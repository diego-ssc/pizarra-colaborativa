import { Controller, Post, Body } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/createWorkspaceDto.dto';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}
  @Post()
  createWorkspace(@Body() newWorkspace: CreateWorkspaceDto) {
    return this.workspaceService.createWorkspace(newWorkspace);
  }
}
