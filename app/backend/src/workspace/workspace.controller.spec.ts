import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { TestingDatabaseModule } from 'src/test-utils/test-utils.module';

describe('WorkspaceController', () => {
  let controller: WorkspaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [WorkspaceService],
      controllers: [WorkspaceController],
    }).compile();

    controller = module.get<WorkspaceController>(WorkspaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
