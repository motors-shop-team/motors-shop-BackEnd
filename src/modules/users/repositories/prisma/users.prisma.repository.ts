/* eslint-disable prettier/prettier */

import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../users.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { Address } from 'src/modules/address/entities/address.entity';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, {
      ...data,
    });

    const address = new Address();
    Object.assign(address, {
      ...data.address,
    });
    const newUser = await this.prisma.user.create({
      data: { ...user, address: { create: { ...address } } },
    });
    return plainToInstance(User, newUser);
  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    console.log(users, 'users here');
    return users;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log(user, 'user here');

    return user;
  }
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        address: {
          select: {
            id: true,
            zip_code: true,
            state: true,
            city: true,
            street: true,
            number: true,
            complement: true,
            userId: true,
          },
        },
      },
    });
    return user;
    // throw new Error('Method not implemented.');
  }
  async update(id: string, data: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
