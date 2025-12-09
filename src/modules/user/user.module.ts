import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './controllers/user/user.controller';
import { UserRepository } from './repositories/user/user.repository';
import { RegisterService } from './services/user/register/register.service';
import { GetByIdService } from './services/user/get-by-id/get-by-id.service';
import { ListService } from './services/user/list/list.service';
import { UpdateService } from './services/user/update/update.service';
import { DeleteService } from './services/user/delete/delete.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    RegisterService,
    GetByIdService,
    ListService,
    UpdateService,
    DeleteService,
  ],
  exports: [UserRepository],
})
export class UserModule {}

