import { UpdateUserRequestDto } from '../../../dtos/user/update.request.dto';

export interface IUpdateService {
  execute(id: string, data: UpdateUserRequestDto): Promise<any>;
}

