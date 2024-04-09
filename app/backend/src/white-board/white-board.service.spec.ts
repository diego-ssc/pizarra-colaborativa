import { Test, TestingModule } from '@nestjs/testing';
import { WhiteBoardService } from './white-board.service';

describe('WhiteBoardService', () => {
  let service: WhiteBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhiteBoardService],
    }).compile();

    service = module.get<WhiteBoardService>(WhiteBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
