import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGroup } from './user-group.entity';
import { Repository } from 'typeorm';
import { CreateUserGroupDto } from './dto/create-user-groupDto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserGroupDto } from './dto/update-user-groupDto.dto';
@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>,
  ) {}

  async createUserGroup(userGroup: CreateUserGroupDto) {
    const userGroupFound = await this.userGroupRepository.findOne({
      where: {
        name: userGroup.name,
      },
    });
    if (userGroupFound) {
      return new HttpException('Usergroup already exists', HttpStatus.CONFLICT);
    }

    const newUserGroup = this.userGroupRepository.create(userGroup);
    this.userGroupRepository.save(newUserGroup);
  }

  async getUserGroups() {
    return this.userGroupRepository.find();
  }

  async getUserGroupById(id: number) {
    const userGroup = await this.userGroupRepository.findOne({
      where: {
        userGroupId: id,
      },
    });
    if (userGroup) {
      return userGroup;
    }
    throw new NotFoundException('Could not find the Usergroup');
  }

  async deleteUserGroupById(id: number) {
    const userGroup = await this.userGroupRepository.findOne({
      where: {
        userGroupId: id,
      },
    });
    if (!userGroup) {
      return new HttpException('Usergroup not found', HttpStatus.NOT_FOUND);
    }
    await this.userGroupRepository.remove(userGroup);
    return userGroup;
  }

  async updateUserGroup(id: number, userGroup: UpdateUserGroupDto) {
    const userGroupFound = await this.userGroupRepository.findOne({
      where: {
        userGroupId: id,
      },
    });

    if (!userGroupFound) {
      return new HttpException('Usergroup not found', HttpStatus.NOT_FOUND);
    }
    const updateUserGroup = Object.assign(userGroupFound, userGroup);
    return this.userGroupRepository.save(updateUserGroup);
  }
}
