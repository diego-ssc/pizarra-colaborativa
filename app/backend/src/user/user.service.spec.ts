import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TestingDatabaseModule } from 'src/test-utils/test-utils.module';
import { seedTestDataset } from 'src/test-utils/test-dataset.seed';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import User from './user.entity';

describe('UserService', () => {
  let service: UsersService;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    const dataSource = module.get<DataSource>(DataSource);
    const { user1 } = await seedTestDataset(dataSource);
    user = user1;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all the users', async () => {
    const users = await service.getAllUsers();

    expect(users).toEqual([user]);
  });

  it('should create a user', async () => {
    const user = {
      username: 'user2',
      email: 'user2@mail.com',
      password: 'password',
    };

    const newUser = await service.createUser(user);

    expect(newUser).toMatchObject(user);
    expect(await service.getUserById(newUser.userId)).toMatchObject(user);
  });

  it('fails to create a user that already exists', async () => {
    expect(service.createUser(user)).rejects.toMatchObject(
      new BadRequestException('email already exists'),
    );
  });

  it('deletes user by id', async () => {
    await service.deleteById(1);

    expect(await service.getAllUsers()).toEqual([]);
  });
});
