import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm'
import { HasPermissionService } from './has-permission.service';
import { HasPermission } from '../has-permission/has-permission.entity';
import { User } from '../user/user.entity';
import { WhiteBoard } from '../white-board/white-board.entity';
import { TestingDatabaseModule } from '../test-utils/test-utils.module';
import { Workspace } from '../workspace/workspace.entity';

describe('HasPermissionService', () => {
  let service: HasPermissionService;
  let mockUserRepository: Repository<User>;
  let mockWhiteboardRepository: Repository<WhiteBoard>;
  let mockWorkspaceRepository: Repository<Workspace>;
  let mockHasPermissionRepository: Repository<HasPermission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [
        HasPermissionService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(WhiteBoard),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Workspace),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(HasPermission),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<HasPermissionService>(HasPermissionService);
    mockUserRepository = module.get<Repository<User>>(getRepositoryToken(User));
    mockWhiteboardRepository = module.get<Repository<WhiteBoard>>(getRepositoryToken(WhiteBoard));
    mockWorkspaceRepository = module.get<Repository<Workspace>>(getRepositoryToken(Workspace));
    mockHasPermissionRepository = module.get<Repository<HasPermission>>(getRepositoryToken(HasPermission));

  });

  describe('checkUserHasAccessToWhiteboard', () => {
    it('should return true if user has permission for the whiteboard', async () => {
      const userId = 1;
      const whiteboardId = "1";

      const hasPermission = new HasPermission();
      hasPermission.action = HasPermission.Action.READ;

      const user = new User();
      user.userId = userId;
      user.hasPermissions = hasPermission;

      const whiteboard = new WhiteBoard();
      whiteboard.whiteBoardId = whiteboardId;
      whiteboard.hasPermissions = hasPermission;

      hasPermission.users = [user];
      hasPermission.whiteBoards = [whiteboard];

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWhiteboardRepository, 'findOne').mockResolvedValueOnce(whiteboard);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(hasPermission);

      const hasAccess = await service.hasUserAccessToWhiteboard(userId, whiteboardId);
      expect(hasAccess).toBe(true);
    });

    it('should return false if user does not have permission for the whiteboard', async () => {
      const userId = 1;
      const whiteboardId = "1";

      const user = new User();
      user.userId = userId;

      const whiteboard = new WhiteBoard();
      whiteboard.whiteBoardId = whiteboardId;

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWhiteboardRepository, 'findOne').mockResolvedValueOnce(whiteboard);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(undefined);

      const hasAccess = await service.hasUserAccessToWhiteboard(userId, whiteboardId);
      expect(hasAccess).toBe(false);
    });

  });


  describe('checkUserHasAccessToWorkspace', () => {
    it('should return true if user has permission for the workspace', async () => {
      const userId = 1;
      const workspaceId = 1;

      const hasPermission = new HasPermission();
      hasPermission.action = HasPermission.Action.READ;

      const user = new User();
      user.userId = userId;
      user.hasPermissions = hasPermission;

      const workspace = new Workspace();
      workspace.workspaceId = workspaceId;
      workspace.hasPermissions = hasPermission;

      hasPermission.users = [user];
      hasPermission.workspaces = [workspace];

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWorkspaceRepository, 'findOne').mockResolvedValueOnce(workspace);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(hasPermission);

      const hasAccess = await service.hasUserAccessToWorkspace(userId, workspaceId);
      expect(hasAccess).toBe(true);
    });

    it('should return false if user does not have permission for the workspace', async () => {
      const userId = 1;
      const workspaceId = 1;

      const user = new User();
      user.userId = userId;

      const workspace = new Workspace();
      workspace.workspaceId = workspaceId;

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWorkspaceRepository, 'findOne').mockResolvedValueOnce(workspace);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(undefined);

      const hasAccess = await service.hasUserAccessToWorkspace(userId, workspaceId);
      expect(hasAccess).toBe(false);
    });

  });


  describe('checkUserPermissiontoWhiteBoard', () => {
    it('should set the new action to the user permission', async () => {
      const userId = 1;
      const whiteBoardId = "1";

      const hasPermission = new HasPermission();
      hasPermission.action = HasPermission.Action.READ;

      const user = new User();
      user.userId = userId;
      user.hasPermissions = hasPermission;

      const whiteboard = new WhiteBoard();
      whiteboard.whiteBoardId = whiteBoardId;
      whiteboard.hasPermissions = hasPermission;

      hasPermission.users = [user];
      hasPermission.whiteBoards = [whiteboard];

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWhiteboardRepository, 'findOne').mockResolvedValueOnce(whiteboard);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(hasPermission);

      await service.addUserPermissionToWhiteboard(userId,
        whiteBoardId, HasPermission.Action.WRITE);

      expect(user.hasPermissions.action).toBe(HasPermission.Action.WRITE);
      expect(hasPermission.action).toBe(HasPermission.Action.WRITE);
    });

    it('should set the new action to the not yet created user permission', async () => {
      const userId = 1;
      const whiteBoardId = "1";

      const user = new User();
      user.userId = userId;

      const whiteboard = new WhiteBoard();
      whiteboard.whiteBoardId = whiteBoardId;

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWhiteboardRepository, 'findOne').mockResolvedValueOnce(whiteboard);

      await service.addUserPermissionToWhiteboard(userId,
        whiteBoardId, HasPermission.Action.WRITE);

      expect(user.hasPermissions.action).toBe(HasPermission.Action.WRITE);
    });

  });

  describe('checkUserPermissionToWhiteBoardDeleted', () => {
    it('should delete the user permission', async () => {
      const userId = 1;
      const whiteBoardId = "1";

      const hasPermission = new HasPermission();
      hasPermission.action = HasPermission.Action.READ;
      hasPermission.idPermission = 1;

      const user = new User();
      user.userId = userId;
      user.hasPermissions = hasPermission;

      const whiteboard = new WhiteBoard();
      whiteboard.whiteBoardId = whiteBoardId;
      whiteboard.hasPermissions = hasPermission;

      hasPermission.users = [user];
      hasPermission.whiteBoards = [whiteboard];

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWhiteboardRepository, 'findOne').mockResolvedValueOnce(whiteboard);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(hasPermission);
      jest.spyOn(mockHasPermissionRepository, 'remove').mockResolvedValueOnce(null);

      await service.deleteUserPermissionFromWhiteboard(userId, whiteBoardId);

      expect(user.hasPermissions.whiteBoards).not.toContain(whiteboard);
      expect(hasPermission.whiteBoards.length).toBe(0);
      expect(whiteboard.hasPermissions.users).not.toContain(user);
    });

    it('should not delete the user permission', async () => {
      const userId = 1;
      const whiteBoardId = "1";

      const hasPermission = new HasPermission();
      hasPermission.action = HasPermission.Action.READ;
      hasPermission.idPermission = 1;

      const user = new User();
      user.userId = userId;
      user.hasPermissions = hasPermission;

      const whiteboard = new WhiteBoard();
      whiteboard.whiteBoardId = whiteBoardId;

      const whiteboard2 = new WhiteBoard();
      whiteboard2.whiteBoardId = "2";
      whiteboard2.hasPermissions = hasPermission;

      hasPermission.users = [user];
      hasPermission.whiteBoards = [whiteboard2];

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWhiteboardRepository, 'findOne').mockResolvedValueOnce(whiteboard);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(hasPermission);

      await service.deleteUserPermissionFromWhiteboard(userId, whiteBoardId);

      expect(user.hasPermissions.whiteBoards.length).toBe(1);
      expect(user.hasPermissions.whiteBoards[0].whiteBoardId).toBe("2");
      expect(hasPermission).not.toBeNull();
    });

  });

  describe('checkUserPermissiontoWorkspace', () => {
    it('should set the new action to the user permission', async () => {
      const userId = 1;
      const workspaceId = 1;

      const hasPermission = new HasPermission();
      hasPermission.action = HasPermission.Action.READ;

      const user = new User();
      user.userId = userId;
      user.hasPermissions = hasPermission;

      const workspace = new Workspace();
      workspace.workspaceId = workspaceId;
      workspace.hasPermissions = hasPermission;

      hasPermission.users = [user];
      hasPermission.workspaces = [workspace];

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWorkspaceRepository, 'findOne').mockResolvedValueOnce(workspace);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(hasPermission);

      await service.addUserPermissionToWorkspace(userId,
        workspaceId, HasPermission.Action.WRITE);

      expect(user.hasPermissions.action).toBe(HasPermission.Action.WRITE);
      expect(hasPermission.action).toBe(HasPermission.Action.WRITE);
    });

    it('should set the new action to the not yet created user permission', async () => {
      const userId = 1;
      const workspaceId = 1;

      const user = new User();
      user.userId = userId;

      const workspace = new Workspace();
      workspace.workspaceId = workspaceId;

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWorkspaceRepository, 'findOne').mockResolvedValueOnce(workspace);

      await service.addUserPermissionToWorkspace(userId,
        workspaceId, HasPermission.Action.WRITE);

      expect(user.hasPermissions.action).toBe(HasPermission.Action.WRITE);
    });

  });


  describe('checkUserPermissionToWorskpaceDeleted', () => {
    it('should delete the user permission', async () => {
      const userId = 1;
      const workspaceId = 1;

      const hasPermission = new HasPermission();
      hasPermission.action = HasPermission.Action.READ;
      hasPermission.idPermission = 1;

      const user = new User();
      user.userId = userId;
      user.hasPermissions = hasPermission;

      const workspace = new Workspace();
      workspace.workspaceId = workspaceId;
      workspace.hasPermissions = hasPermission;

      hasPermission.users = [user];
      hasPermission.workspaces = [workspace];

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWorkspaceRepository, 'findOne').mockResolvedValueOnce(workspace);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(hasPermission);
      jest.spyOn(mockHasPermissionRepository, 'remove').mockResolvedValueOnce(null);

      await service.deleteUserPermissionFromWorkspace(userId, workspaceId);

      expect(user.hasPermissions.workspaces).not.toContain(workspace);
      expect(hasPermission.workspaces.length).toBe(0);
      expect(workspace.hasPermissions.users).not.toContain(user);
    });

    it('should not delete the user permission', async () => {
      const userId = 1;
      const workspaceId = 1;

      const hasPermission = new HasPermission();
      hasPermission.action = HasPermission.Action.READ;
      hasPermission.idPermission = 1;

      const user = new User();
      user.userId = userId;
      user.hasPermissions = hasPermission;

      const workspace = new Workspace();
      workspace.workspaceId = workspaceId;

      const workspace2 = new Workspace();
      workspace2.workspaceId = 2;
      workspace2.hasPermissions = hasPermission;

      hasPermission.users = [user];
      hasPermission.workspaces = [workspace2];

      jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(mockWorkspaceRepository, 'findOne').mockResolvedValueOnce(workspace);
      jest.spyOn(mockHasPermissionRepository, 'findOne').mockResolvedValueOnce(hasPermission);

      await service.deleteUserPermissionFromWorkspace(userId, workspaceId);

      expect(user.hasPermissions.workspaces.length).toBe(1);
      expect(user.hasPermissions.workspaces[0].workspaceId).toBe(2);
      expect(hasPermission).not.toBeNull();
    });

  });

});
