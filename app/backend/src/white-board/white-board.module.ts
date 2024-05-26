import { Module } from '@nestjs/common';
import { WhiteBoardController } from './white-board.controller';
import { WhiteBoardService } from './white-board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhiteBoard } from './white-board.entity';
import { HasPermissionModule } from 'src/has-permission/has-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([WhiteBoard]), HasPermissionModule],
  controllers: [WhiteBoardController],
  providers: [WhiteBoardService],
  exports: [WhiteBoardService],
})
export class WhiteBoardModule { }
