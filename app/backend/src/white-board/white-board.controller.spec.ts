import { Test, TestingModule } from '@nestjs/testing';
import { WhiteBoardController } from './white-board.controller';

describe('WhiteBoardController', () => {
  let controller: WhiteBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhiteBoardController],
    }).compile();

    controller = module.get<WhiteBoardController>(WhiteBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
