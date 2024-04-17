import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async createWorkspace(workspace: CreateWorkspaceDto) {
    const workspaceFound = await this.workspaceRepository.findOne({
      where: {
        title: workspace.title,
      },
    });
    if (workspaceFound) {
      return new HttpException(
        'Whiteboard already exists',
        HttpStatus.CONFLICT,
      );
    }
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
      return new HttpException('Workspace not found', HttpStatus.NOT_FOUND);
    }
    await this.workspaceRepository.remove(workspace);
    return workspace;
  }

  async updateWorkspace(id: number, workspace: UpdateWorkspaceDto) {
    const workspaceFound = await this.workspaceRepository.findOne({
      where: {
        workspaceId: id,
      },
    });

    if (!workspaceFound) {
      return new HttpException('Workspace not found', HttpStatus.NOT_FOUND);
    }
    const updateWorkspace = Object.assign(workspaceFound, workspace);
    return this.workspaceRepository.save(updateWorkspace);
  }
}
