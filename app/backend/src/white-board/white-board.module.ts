import { Module } from '@nestjs/common';
import { WhiteBoardController } from './white-board.controller';
import { WhiteBoardService } from './white-board.service';

@Module({
  controllers: [WhiteBoardController],
  providers: [WhiteBoardService]
})
export class WhiteBoardModule {}
