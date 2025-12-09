import { IBaseRepository } from 'src/common/core/repositories/base.repository.interface';
import { News } from '../../types/news.types';

export interface INewsRepository extends IBaseRepository<News> {}

