import { Test, TestingModule } from '@nestjs/testing';
import { HasPermissionController } from './has-permission.controller';

describe('HasPermissionController', () => {
  let controller: HasPermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HasPermissionController],
    }).compile();

    controller = module.get<HasPermissionController>(HasPermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
