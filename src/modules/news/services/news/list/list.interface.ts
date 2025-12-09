import { ListNewsRequestDto } from '../../../dtos/news/list-news.request.dto';
import { ListNewsResponseDto } from '../../../dtos/news/list-news.response.dto';

export interface IListService {
  execute(filters: ListNewsRequestDto): Promise<ListNewsResponseDto>;
}

