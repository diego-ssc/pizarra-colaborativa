import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TestingDatabaseModule } from 'src/test-utils/test-utils.module';
import { USER_1, seedTestDataset } from 'src/test-utils/test-dataset.seed';
import { DataSource } from 'typeorm';
import User from './user.entity';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TestingDatabaseModule()],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    const dataSource = module.get<DataSource>(DataSource);
    await seedTestDataset(dataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all the users', async () => {
    const users = await service.getAllUsers();

    expect(users).toEqual([USER_1]);
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
    expect(service.createUser(USER_1)).rejects.toMatchObject(
      new BadRequestException('email already exists'),
    );
  });

  it('deletes user by id', async () => {
    await service.deleteById(1);

    expect(await service.getAllUsers()).toEqual([]);
  });
});
