import { Test, TestingModule } from '@nestjs/testing';
import { WhiteBoardService } from './white-board.service';
import { TestingDatabaseModule } from 'src/test-utils/test-utils.module';
import { DataSource } from 'typeorm';
import { seedTestDataset } from 'src/test-utils/test-dataset.seed';
import WhiteBoard from './white-board.entity';
import Workspace from 'src/workspace/workspace.entity';
import { OrderByOption, OrderOption } from './dto/white-board-query';

describe('WhiteBoardService', () => {
  let service: WhiteBoardService;
  let whiteboard1: WhiteBoard;
  let whiteboard2: WhiteBoard;
  let workspace1: Workspace;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [WhiteBoardService],
    }).compile();

    service = module.get<WhiteBoardService>(WhiteBoardService);
    const dataSource = module.get<DataSource>(DataSource);
    const entities = await seedTestDataset(dataSource);
    whiteboard1 = entities.whiteboard1;
    whiteboard2 = entities.whiteboard2;
    workspace1 = entities.workspace1;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gets all whiteboards', async () => {
    const boards = await service.getWhiteBoards({});

    expect(boards).toMatchObject([whiteboard1, whiteboard2]);
  });

  it('filters whiteboards by workspace', async () => {
    const boards = await service.getWhiteBoards({
      workspace: workspace1.workspaceId,
    });

    expect(boards).toMatchObject([whiteboard1]);
  });

  it('filters whiteboards by title', async () => {
    const boards = await service.getWhiteBoards({
      title: '2',
    });

    expect(boards).toMatchObject([whiteboard2]);
  });

  it('combined multiple filters', async () => {
    const boards = await service.getWhiteBoards({
      title: '2',
      workspace: workspace1.workspaceId,
    });

    expect(boards).toMatchObject([]);
  });

  it('orders by field', async () => {
    const boards = await service.getWhiteBoards({
      orderBy: OrderByOption.Title,
      order: OrderOption.Descending,
    });

    expect(boards).toMatchObject([whiteboard2, whiteboard1]);
  });
});
