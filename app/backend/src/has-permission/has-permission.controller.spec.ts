import { Test, TestingModule } from '@nestjs/testing';
import { HasPermissionController } from './has-permission.controller';
import { TestingDatabaseModule } from '../test-utils/test-utils.module';
import { HasPermissionService } from './has-permission.service';

describe('HasPermissionController', () => {
  let controller: HasPermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [HasPermissionService],
      controllers: [HasPermissionController],
    }).compile();

    controller = module.get<HasPermissionController>(HasPermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
