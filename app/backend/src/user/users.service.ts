import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-userDto.dto';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        userId: id,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }

  async createUser(createUserDto: CreateUserDto) {
    const emailExists = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    return await this.usersRepository.save({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  async deleteById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        userId: id,
      },
    });
    if (!user) {
      return null;
    }

    await this.usersRepository.remove(user);
    return user;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.usersRepository.findOne({
      where: {
        userId: id,
      },
    });

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const updateUser = Object.assign(userFound, user);
    return this.usersRepository.save(updateUser);
  }
}
