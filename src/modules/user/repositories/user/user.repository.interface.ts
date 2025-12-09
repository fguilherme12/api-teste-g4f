import { IBaseRepository } from 'src/common/core/repositories/base.repository.interface';
import { UserCreateData, UserUpdateData } from '../../types/user.types';

export interface IUserRepository extends IBaseRepository<any> {
  create(data: UserCreateData): Promise<any>;
  findById(id: string): Promise<any | null>;
  findByEmail(email: string): Promise<any | null>;
  update(id: string, data: UserUpdateData): Promise<any>;
  delete(id: string): Promise<any>;
}

