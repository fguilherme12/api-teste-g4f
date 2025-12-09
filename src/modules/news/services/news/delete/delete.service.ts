import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteService } from './delete.interface';
import { NewsRepository } from '../../../repositories/news/news.repository';
import { CacheService } from '../../../../../common/core/cache/cache.service';

@Injectable()
export class DeleteService implements IDeleteService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(id: string): Promise<void> {
    const existingNews = await this.newsRepository.findById(id);

    if (!existingNews) {
      throw new NotFoundException('News not found');
    }

    await this.newsRepository.delete(id);
    this.cacheService.deletePattern('^news:list:');
  }
}

