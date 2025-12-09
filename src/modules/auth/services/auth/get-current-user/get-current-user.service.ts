import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IGetCurrentUserService } from './get-current-user.interface';
import { UserRepository } from '../../../../user/repositories/user/user.repository';

@Injectable()
export class GetCurrentUserService implements IGetCurrentUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password: _password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

