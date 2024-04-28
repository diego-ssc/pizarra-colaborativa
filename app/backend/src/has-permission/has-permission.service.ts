import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HasPermission } from './has-permission.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateHasPermissionDto } from './dto/create-has-permissionDto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateHasPermissionDto } from './dto/update-has-permissionDto.dto';

@Injectable()
export class HasPermissionService {
  constructor(
    @InjectRepository(HasPermission)
    private hasPermissionRepository: Repository<HasPermission>,
    private datasource: DataSource
  ) { }

  async createHasPermission(hasPermission: CreateHasPermissionDto) {
    const hasPermissionFound = await this.hasPermissionRepository.findOne({
      where: {
        action: hasPermission.action,
      },
    });
    if (hasPermissionFound) {
      return new HttpException(
        'Permission already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newHasPermission = this.hasPermissionRepository.create(hasPermission);
    this.hasPermissionRepository.save(newHasPermission);
  }

  async getHasPermissions() {
    return this.hasPermissionRepository.find();
  }

  async getHasPermissionById(id: number) {
    const hasPermission = await this.hasPermissionRepository.findOne({
      where: {
        idPermission: id,
      },
    });
    if (hasPermission) {
      return hasPermission;
    }
    throw new NotFoundException('Could not find the permission');
  }

  async deleteHasPermissionById(id: number) {
    const hasPermission = await this.hasPermissionRepository.findOne({
      where: {
        idPermission: id,
      },
    });
    if (!hasPermission) {
      return new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    await this.hasPermissionRepository.remove(hasPermission);
    return hasPermission;
  }

  async updateHasPermission(id: number, hasPermission: UpdateHasPermissionDto) {
    const hasPermissionFound = await this.hasPermissionRepository.findOne({
      where: {
        idPermission: id,
      },
    });

    if (!hasPermissionFound) {
      return new HttpException('Permission not found', HttpStatus.NOT_FOUND);
    }
    const updateHasPermission = Object.assign(hasPermissionFound, hasPermission,);
    return this.hasPermissionRepository.save(updateHasPermission);
  }
}
