import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CreateHasPermissionDto } from './dto/create-has-permissionDto.dto';
import { HasPermissionService } from './has-permission.service';
import HasPermission from './has-permission.entity';
import { UpdateHasPermissionDto } from './dto/update-has-permissionDto.dto';

@Controller('has-permission')
export class HasPermissionController {
  constructor(private hasPermissionService: HasPermissionService) {}

  @Get()
  getHasPermissions(): Promise<HasPermission[]> {
    return this.hasPermissionService.getHasPermissions();
  }

  @Get(':id')
  getHasPermissionById(@Param() id: string): Promise<HasPermission> {
    return this.hasPermissionService.getHasPermissionById(Number(id));
  }

  @Post()
  createHasPermission(@Body() newHasPermission: CreateHasPermissionDto) {
    return this.hasPermissionService.createHasPermission(newHasPermission);
  }

  @Delete(':id')
  deleteHasPermissionById(@Param('id') id: string) {
    this.hasPermissionService.deleteHasPermissionById(Number(id));
  }

  @Patch(':id')
  updateHasPermission(
    @Param('id') id: string,
    @Body() hasPermission: UpdateHasPermissionDto,
  ) {
    return this.hasPermissionService.updateHasPermission(
      Number(id),
      hasPermission,
    );
  }
}
