import { Injectable, NotFoundException } from '@nestjs/common';
import { IUpdateService } from './update.interface';
import { UpdateUserRequestDto } from '../../../dtos/user/update.request.dto';
import { UserRepository } from '../../../repositories/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateService implements IUpdateService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserRequestDto): Promise<any> {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const updateData = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.userRepository.update(id, updateData);

    const { password: _password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
