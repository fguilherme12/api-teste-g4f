import { RegisterUserRequestDto } from '../../../dtos/user/register.request.dto';

export interface RegisterResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    roleId?: string;
  };
}

export interface IRegisterService {
  execute(data: RegisterUserRequestDto): Promise<RegisterResponse>;
}

