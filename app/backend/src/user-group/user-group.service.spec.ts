import { Test, TestingModule } from '@nestjs/testing';
import { UserGroupService } from './user-group.service';
import { TestingDatabaseModule } from 'src/test-utils/test-utils.module';

describe('UserGroupService', () => {
  let service: UserGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [UserGroupService],
    }).compile();

    service = module.get<UserGroupService>(UserGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
