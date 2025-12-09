import { UpdateNewsRequestDto } from '../../../dtos/news/update-news.request.dto';
import { News } from '../../../types/news.types';

export interface IUpdateService {
  execute(id: string, data: UpdateNewsRequestDto): Promise<News>;
}

