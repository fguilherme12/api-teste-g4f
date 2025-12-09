import { News } from '../../../types/news.types';

export interface IGetByIdService {
  execute(id: string): Promise<News>;
}

