import { Test, TestingModule } from '@nestjs/testing';
import { WhiteBoardController } from './white-board.controller';
import { WhiteBoardService } from './white-board.service';
import { TestingDatabaseModule } from '../test-utils/test-utils.module';

describe('WhiteBoardController', () => {
  let controller: WhiteBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [WhiteBoardService],
      controllers: [WhiteBoardController],
    }).compile();

    controller = module.get<WhiteBoardController>(WhiteBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
