import { Test, TestingModule } from '@nestjs/testing';
import { BlocksuiteGateway } from './blocksuite.gateway';

describe('BlocksuiteGateway', () => {
  let gateway: BlocksuiteGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlocksuiteGateway],
    }).compile();

    gateway = module.get<BlocksuiteGateway>(BlocksuiteGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
