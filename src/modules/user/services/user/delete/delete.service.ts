import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteService } from './delete.interface';
import { UserRepository } from '../../../repositories/user/user.repository';

@Injectable()
export class DeleteService implements IDeleteService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);
  }
}

