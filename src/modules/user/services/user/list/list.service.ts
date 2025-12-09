import { Injectable } from '@nestjs/common';
import { IListService } from './list.interface';
import { UserRepository } from '../../../repositories/user/user.repository';

@Injectable()
export class ListService implements IListService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<any[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => {
      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}
