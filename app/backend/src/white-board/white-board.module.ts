import { Module } from '@nestjs/common';
import { WhiteBoardController } from './white-board.controller';
import { WhiteBoardService } from './white-board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhiteBoard } from './white-board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhiteBoard])],
  controllers: [WhiteBoardController],
  providers: [WhiteBoardService],
})
export class WhiteBoardModule {}
