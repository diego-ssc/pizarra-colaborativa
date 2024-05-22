import { DataSource } from 'typeorm';
import { User } from '../../src/user/user.entity';
import Workspace from '../../src/workspace/workspace.entity';
import WhiteBoard from '../../src/white-board/white-board.entity';

const USER_1 = {
  username: 'user1',
  email: 'user1@test.com',
  password: 'password',
};

const WORKSPACE_1 = {
  title: 'workspace_1',
};

const WORKSPACE_2 = {
  title: 'workspace_2',
};

const WHITEBOARD_1 = {
  title: 'whiteboard_1',
};

const WHITEBOARD_2 = {
  title: 'whiteboard_2',
};

export async function seedTestDataset(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const workspaceRepository = dataSource.getRepository(Workspace);
  const whiteboardRepository = dataSource.getRepository(WhiteBoard);

  const user1 = await userRepository.save(USER_1);

  const workspace1 = await workspaceRepository.save(WORKSPACE_1);
  const workspace2 = await workspaceRepository.save(WORKSPACE_2);

  let whiteboard1 = whiteboardRepository.create(WHITEBOARD_1);
  whiteboard1.workspace = workspace1;
  whiteboard1 = await whiteboardRepository.save(whiteboard1);

  let whiteboard2 = whiteboardRepository.create(WHITEBOARD_2);
  whiteboard2.workspace = workspace2;
  whiteboard2 = await whiteboardRepository.save(whiteboard2);

  return { user1, workspace1, workspace2, whiteboard1, whiteboard2 };
}
