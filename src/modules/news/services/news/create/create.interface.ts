import { CreateNewsRequestDto } from '../../../dtos/news/create-news.request.dto';
import { News } from '../../../types/news.types';

export interface ICreateService {
  execute(data: CreateNewsRequestDto): Promise<News>;
}

