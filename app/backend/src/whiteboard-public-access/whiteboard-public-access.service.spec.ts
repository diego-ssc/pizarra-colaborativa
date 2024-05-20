import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { WhiteboardPublicAccessService } from 'src/whiteboard-public-access/whiteboard-public-access.service';

describe('WhiteboardPublicAccessService', () => {
  let service: WhiteboardPublicAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhiteboardPublicAccessService,
        {
          provide: 'WhiteboardPublicAccessRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service =
      module.get<WhiteboardPublicAccessService>(WhiteboardPublicAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
