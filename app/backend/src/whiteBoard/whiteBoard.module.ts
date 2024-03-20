import WhiteBoard from './whiteBoard.entity';
import { Module } from '@nestjs/common';
import { WhiteBoardController } from './whiteBoard.controller';
import { WhiteBoardService } from './whiteBoard.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([WhiteBoard])],
    controllers: [WhiteBoardController],
    providers: [WhiteBoardService],
})
export class WhiteBoardModule {}
