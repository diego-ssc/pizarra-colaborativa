import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhiteBoard } from './whiteBoard.entity';
import { CreateWhiteBoardDto } from './dto/whiteBoard.dto';

@Injectable()
export class WhiteBoardService {
    constructor(
        @InjectRepository(WhiteBoard)
        private readonly whiteBoardRepository: Repository<WhiteBoard>,
    ) {}

    async getAllWhiteBoards(): Promise<WhiteBoard[]> {
        return this.whiteBoardRepository.find();
    }

    async getWhiteBoardById(whiteBoardId: number): Promise<WhiteBoard> {
        const whiteBoard = await this.whiteBoardRepository.findOne(whiteBoardId);
        if (!whiteBoard) {
            throw new NotFoundException('Could not find the whiteboard');
        }
        return whiteBoard;
    }

    async createWhiteBoard(createWhiteBoardDto: CreateWhiteBoardDto): Promise<WhiteBoard> {
        const whiteBoard = this.whiteBoardRepository.create(createWhiteBoardDto);
        return this.whiteBoardRepository.save(whiteBoard);
    }

    async deleteWhiteBoardById(whiteBoardId: number): Promise<void> {
        const whiteBoard = await this.getWhiteBoardById(whiteBoardId);
        await this.whiteBoardRepository.remove(whiteBoard);
    }
}
