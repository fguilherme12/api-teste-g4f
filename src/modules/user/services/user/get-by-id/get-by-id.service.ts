import { Injectable, NotFoundException } from '@nestjs/common';
import { IGetByIdService } from './get-by-id.interface';
import { UserRepository } from '../../../repositories/user/user.repository';

@Injectable()
export class GetByIdService implements IGetByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<any> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password: _password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
