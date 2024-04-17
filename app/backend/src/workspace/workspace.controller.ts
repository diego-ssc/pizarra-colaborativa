import { Controller, Post, Body, Get, Param, Delete, Patch} from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/createWorkspaceDto.dto';
import { WorkspaceService } from './workspace.service';
import Workspace from './workspace.entity';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

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

  @Delete(':id')
  deleteWorkspaceById(@Param('id') id: string) {
    this.workspaceService.deleteWorkspaceById(Number(id));
  }

  @Patch(':id')
  updateWorkspace(@Param('id') id: string, @Body() workspace: UpdateWorkspaceDto) {
    return this.workspaceService.updateWorkspace(Number(id), workspace);
  }
}
