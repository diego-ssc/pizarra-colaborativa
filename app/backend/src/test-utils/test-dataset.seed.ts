import { DataSource } from 'typeorm';
import { User } from 'src/user/user.entity';

export const USER_1 = {
  username: 'user1',
  email: 'user1@test.com',
  password: 'password',
};

export const seedTestDataset = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  await userRepository.save(USER_1);
};
