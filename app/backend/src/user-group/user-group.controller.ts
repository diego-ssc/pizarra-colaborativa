import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CreateUserGroupDto } from './dto/create-user-groupDto.dto';
import { UserGroupService } from './user-group.service';
import UserGroup from './user-group.entity';
import { UpdateUserGroupDto } from './dto/update-user-groupDto.dto';

@Controller('user-group')
export class UserGroupController {
  constructor(private userGroupService: UserGroupService) {}

  @Get()
  getUserGroups(): Promise<UserGroup[]> {
    return this.userGroupService.getUserGroups();
  }

  @Get(':id')
  getUserGroupById(@Param() id: string): Promise<UserGroup> {
    return this.userGroupService.getUserGroupById(Number(id));
  }

  @Post()
  createUserGroup(@Body() newUserGroup: CreateUserGroupDto) {
    return this.userGroupService.createUserGroup(newUserGroup);
  }

  @Delete(':id')
  deleteUserGroupById(@Param('id') id: string) {
    this.userGroupService.deleteUserGroupById(Number(id));
  }

  @Patch(':id')
  updateUserGroup(@Param('id') id: string, @Body() userGroup: UpdateUserGroupDto) {
    return this.userGroupService.updateUserGroup(Number(id), userGroup);
  }
}
