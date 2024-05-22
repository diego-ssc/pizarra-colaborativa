import { TypeOrmModule } from '@nestjs/typeorm';
import HasPermission from '../../src/has-permission/has-permission.entity';
import UserGroup from '../../src/user-group/user-group.entity';
import User from '../../src/user/user.entity';
import WhiteBoard from '../../src/white-board/white-board.entity';
import Workspace from '../../src/workspace/workspace.entity';

export const TestingDatabaseModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([
    User,
    Workspace,
    WhiteBoard,
    UserGroup,
    HasPermission,
  ]),
];
