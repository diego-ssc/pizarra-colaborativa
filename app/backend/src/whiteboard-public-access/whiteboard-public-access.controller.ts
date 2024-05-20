import { Controller, Post, Get, Body, Param, NotFoundException } from '@nestjs/common';

import { WhiteboardPublicAccessService } from 'src/whiteboard-public-access/whiteboard-public-access.service';
import { HasPermission } from 'src/has-permission/has-permission.entity';

@Controller('whiteboards/public-access')
export class WhiteboardPublicAccessController {
  constructor(private readonly whiteboardPublicAccessService: WhiteboardPublicAccessService) { }

  @Post(':whiteboardId')
  async setPublicAccessLevel(@Param('whiteboardId') whiteboardId: number, @Body('accessLevel') accessLevel: HasPermission.Action) {
    await this.whiteboardPublicAccessService.setPublicAccessLevel(whiteboardId, accessLevel);
  }

  @Get(':whiteboardId')
  async getPublicAccessLevel(@Param('whiteboardId') whiteboardId: number): Promise<HasPermission.Action | undefined> {
    const accessLevel = await this.whiteboardPublicAccessService.getPublicAccessLevel(whiteboardId);
    if (!accessLevel) {
      throw new NotFoundException('Public access not found for this whiteboard');
    }
    return accessLevel;
  }
}
