import { Injectable, NotFoundException } from '@nestjs/common';
import { IUpdateService } from './update.interface';
import { UpdateNewsRequestDto } from '../../../dtos/news/update-news.request.dto';
import { NewsRepository } from '../../../repositories/news/news.repository';
import { CacheService } from '../../../../../common/core/cache/cache.service';

@Injectable()
export class UpdateService implements IUpdateService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(id: string, data: UpdateNewsRequestDto) {
    const existingNews = await this.newsRepository.findById(id);

    if (!existingNews) {
      throw new NotFoundException('News not found');
    }

    const result = await this.newsRepository.update(id, data);
    this.cacheService.deletePattern('^news:list:');
    return result;
  }
}

