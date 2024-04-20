import { Test, TestingModule } from '@nestjs/testing';
import { HasPermissionService } from './has-permission.service';

describe('HasPermissionService', () => {
  let service: HasPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasPermissionService],
    }).compile();

    service = module.get<HasPermissionService>(HasPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
