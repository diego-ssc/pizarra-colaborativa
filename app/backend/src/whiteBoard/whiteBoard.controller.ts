import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import WhiteBoard from './whiteBoard.entity';
import { WhiteBoardService } from './whiteBoard.service';
import { CreateWhiteBoardDto } from './dto/whiteBoard.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('whiteboards')
export class WhiteBoardController {
    constructor(private readonly whiteBoardService: WhiteBoardService) {}

    @Get()
    async getAllWhiteBoards(): Promise<WhiteBoard[]> {
        return this.whiteBoardService.getAllWhiteBoards();
    }

    @Get(':id')
    async getWhiteBoardById(@Param('id') id: string): Promise<WhiteBoard> {
        return this.whiteBoardService.getWhiteBoardById(Number(id));
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createWhiteBoard(@Body() createWhiteBoardDto: CreateWhiteBoardDto): Promise<WhiteBoard> {
        return this.whiteBoardService.createWhiteBoard(createWhiteBoardDto);
    }

    @Delete(':id')
    async deleteWhiteBoardById(@Param('id') id: string): Promise<void> {
        return this.whiteBoardService.deleteWhiteBoardById(Number(id));
    }
}
