import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupController } from './user-group.controller';
import { UserGroupService } from './user-group.service';
import { TestingDatabaseModule } from '../test-utils/test-utils.module';

describe('UserGroupController', () => {
  let controller: UserGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [UserGroupService],
      controllers: [UserGroupController],
    }).compile();

    controller = module.get<UserGroupController>(UserGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
