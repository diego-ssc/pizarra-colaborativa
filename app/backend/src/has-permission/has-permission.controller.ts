import { Controller, Post, Body, Get, Param, Delete, Patch, Req } from '@nestjs/common';
import { CreateHasPermissionDto } from './dto/create-has-permissionDto.dto';
import { HasPermissionService } from './has-permission.service';
import HasPermission from './has-permission.entity';

@Controller('has-permission')
export class HasPermissionController {
  constructor(private hasPermissionService: HasPermissionService) { }

  @Get()
  getHasPermissions(): Promise<HasPermission[]> {
    return this.hasPermissionService.getHasPermissions();
  }

  @Post()
  createHasPermission(@Body() newHasPermission: CreateHasPermissionDto) {
    return this.hasPermissionService.createHasPermission(newHasPermission);
  }

  @Get(':id')
  async hasUserPermissionToWhiteboard(@Param('id') id: string, @Req() request) {
    const hasPermission = await
      this.hasPermissionService.hasUserAccessToWhiteboard(request.user.userId, id);
    console.log(hasPermission);
    return hasPermission;
  }

  @Post(':id')
  AddUserPermissionToWhiteboard(@Param('id') id: string, @Body() action: {
    action: HasPermission.Action
  }, @Req() request) {
    return this.hasPermissionService.addUserPermissionToWhiteboard(request.user.userId, id, action.action)
  }

  @Delete(':id')
  deleteHasPermissionById(@Param('id') id: string, @Req() request) {
    this.hasPermissionService.deleteUserPermissionFromWhiteboard(request.user.userid, id);
  }

  @Patch(':id')
  updateHasPermission(
    @Param('id') id: string,
    @Body() isPublic: { isPublic: boolean },
  ) {
    return this.hasPermissionService.changeWhiteboardDefaultPermission(id, isPublic.isPublic);
  }
}
