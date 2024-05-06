import { Test, TestingModule } from '@nestjs/testing';
import { HasPermissionService } from './has-permission.service';
import { TestingDatabaseModule } from 'src/test-utils/test-utils.module';

describe('HasPermissionService', () => {
  let service: HasPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [HasPermissionService],
    }).compile();

    service = module.get<HasPermissionService>(HasPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
