import { RegisterUserRequestDto } from '../../../dtos/user/register.request.dto';

export interface IRegisterService {
  execute(data: RegisterUserRequestDto): Promise<any>;
}

