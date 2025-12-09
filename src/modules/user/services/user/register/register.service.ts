import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IRegisterService, RegisterResponse } from './register.interface';
import { RegisterUserRequestDto } from '../../../dtos/user/register.request.dto';
import { UserRepository } from '../../../repositories/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: RegisterUserRequestDto): Promise<RegisterResponse> {
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

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.roleId,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: userWithoutPassword,
    };
  }
}
