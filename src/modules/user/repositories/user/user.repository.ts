import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/core/repositories/base.repository';
import { PrismaService } from 'src/database/core/prisma.service';
import { IUserRepository } from './user.repository.interface';
import { UserCreateData, UserUpdateData } from '../../types/user.types';

@Injectable()
export class UserRepository
  extends BaseRepository<any>
  implements IUserRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'user', true);
  }

  async findByEmail(email: string): Promise<any | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: UserCreateData): Promise<any> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: UserUpdateData): Promise<any> {
    return this.prisma.user.update({ where: { id }, data });
  }
}

