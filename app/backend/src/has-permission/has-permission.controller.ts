import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { HasPermissionService } from './has-permission.service';
import HasPermission from './has-permission.entity';
import { AddPermissionDto } from './dto/add-permission.dto';

@Controller('has-permission')
export class HasPermissionController {
  constructor(private hasPermissionService: HasPermissionService) {}

  @Get(':id')
  async hasUserPermissionToWhiteboard(@Param('id') id: string, @Req() request) {
    const hasPermission =
      await this.hasPermissionService.hasUserAccessToWhiteboard(
        request.user.userId,
        id,
      );
    return hasPermission;
  }

  @Post(':id')
  async AddUserPermissionToWhiteboard(
    @Param('id') whiteBoardID: string,
    @Body() body: AddPermissionDto,
    @Req() request,
  ) {
    const permission =
      await this.hasPermissionService.hasUserAccessToWhiteboard(
        request.user.userId,
        whiteBoardID,
      );

    if (permission !== HasPermission.Action.ADMIN) {
      throw new UnauthorizedException(
        'User not authorized to change permissions',
      );
    }

    await this.hasPermissionService.addBulkUserPermissionToWhiteboard(
      whiteBoardID,
      body,
    );
  }

  @Delete(':id')
  deleteHasPermissionById(@Param('id') id: string, @Req() request) {
    this.hasPermissionService.deleteUserPermissionFromWhiteboard(
      request.user.userid,
      id,
    );
  }

  @Patch(':id')
  updateHasPermission(
    @Param('id') id: string,
    @Body() isPublic: { isPublic: boolean },
  ) {
    return this.hasPermissionService.changeWhiteboardDefaultPermission(
      id,
      isPublic.isPublic,
    );
  }
}
