import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WhiteBoard } from './white-board.entity';
import { Repository } from 'typeorm';
import { CreateWhiteBoardDto } from './dto/createWhiteBoardDto.dto';

@Injectable()
export class WhiteBoardService {
  constructor(
    @InjectRepository(WhiteBoard)
    private whiteBoardRepository: Repository<WhiteBoard>,
  ) {}

  createWhiteBoard(whiteBoard: CreateWhiteBoardDto) {
    const newWhiteBoard = this.whiteBoardRepository.create(whiteBoard);
    this.whiteBoardRepository.save(newWhiteBoard);
  }
}
