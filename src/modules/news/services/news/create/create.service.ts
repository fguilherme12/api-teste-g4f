import { Injectable } from '@nestjs/common';
import { ICreateService } from './create.interface';
import { CreateNewsRequestDto } from '../../../dtos/news/create-news.request.dto';
import { NewsRepository } from '../../../repositories/news/news.repository';
import { News } from '../../../types/news.types';
import { CacheService } from '../../../../../common/core/cache/cache.service';

@Injectable()
export class CreateService implements ICreateService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(data: CreateNewsRequestDto): Promise<News> {
    const result = await this.newsRepository.create(data);
    this.cacheService.deletePattern('^news:list:');
    return result;
  }
}

