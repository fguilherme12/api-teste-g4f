import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginService } from './login.interface';
import { LoginRequestDto } from '../../../dtos/auth/login.request.dto';
import { UserRepository } from '../../../../user/repositories/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: LoginRequestDto) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

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

