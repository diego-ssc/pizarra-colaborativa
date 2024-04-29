import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceService } from './workspace.service';
import { TestingDatabaseModule } from 'src/test-utils/test-utils.module';

describe('WorkspaceService', () => {
  let service: WorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [WorkspaceService],
    }).compile();

    service = module.get<WorkspaceService>(WorkspaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
