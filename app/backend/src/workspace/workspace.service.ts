import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './workspace.entity';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/createWorkspaceDto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  createWorkspace(workspace: CreateWorkspaceDto) {
    const newWorkspace = this.workspaceRepository.create(workspace);
    return this.workspaceRepository.save(newWorkspace);
  }

  async getWorkspaces() {
    return this.workspaceRepository.find();
  }

  async getWorkspaceById(id: number) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        workspaceId: id,
      },
    });
    if (workspace) {
      return workspace;
    }
    throw new NotFoundException('Could not find the workspace');
  }

  async deleteWorkspaceById(id: number) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        workspaceId: id,
      },
    });
    if (!workspace) {
      return null;
    }
    await this.workspaceRepository.remove(workspace);
    return workspace;
  }

  async updateWorkspace(id: number, workspace: UpdateWorkspaceDto) {
    return this.workspaceRepository.update(id, workspace);
  }
}
