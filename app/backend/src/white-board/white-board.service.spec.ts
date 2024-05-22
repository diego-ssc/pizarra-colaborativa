import { Test, TestingModule } from '@nestjs/testing';
import { WhiteBoardService } from './white-board.service';
import { TestingDatabaseModule } from '../test-utils/test-utils.module';

describe('WhiteBoardService', () => {
  let service: WhiteBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [WhiteBoardService],
    }).compile();

    service = module.get<WhiteBoardService>(WhiteBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
