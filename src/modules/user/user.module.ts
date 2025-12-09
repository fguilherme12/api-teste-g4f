import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserRepository } from './repositories/user/user.repository';
import { RegisterService } from './services/user/register/register.service';
import { GetByIdService } from './services/user/get-by-id/get-by-id.service';
import { ListService } from './services/user/list/list.service';
import { UpdateService } from './services/user/update/update.service';
import { DeleteService } from './services/user/delete/delete.service';

@Module({
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

