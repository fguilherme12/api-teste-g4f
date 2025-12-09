import { LoginRequestDto } from '../../../dtos/auth/login.request.dto';

export interface ILoginService {
  execute(data: LoginRequestDto): Promise<any>;
}

