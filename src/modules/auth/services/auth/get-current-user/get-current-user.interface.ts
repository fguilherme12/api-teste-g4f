export interface IGetCurrentUserService {
  execute(userId: string): Promise<any>;
}

