import { Injectable, ConflictException } from '@nestjs/common';
import { IRegisterService } from './register.interface';
import { RegisterUserRequestDto } from '../../../dtos/user/register.request.dto';
import { UserRepository } from '../../../repositories/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService implements IRegisterService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: RegisterUserRequestDto): Promise<any> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const { password: _password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
