import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IListService } from './list.interface';
import { NewsRepository } from '../../../repositories/news/news.repository';
import { ListNewsRequestDto } from '../../../dtos/news/list-news.request.dto';
import { ListNewsResponseDto } from '../../../dtos/news/list-news.response.dto';
import { CacheService } from '../../../../../common/core/cache/cache.service';

@Injectable()
export class ListService implements IListService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(filters: ListNewsRequestDto): Promise<ListNewsResponseDto> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const cacheKey = this.cacheService.generateKey('news:list', {
      page,
      limit,
      title: filters.title || '',
      description: filters.description || '',
    });

    const cached = this.cacheService.get<ListNewsResponseDto>(cacheKey);
    if (cached) {
      return cached;
    }

    const where: any = {
      deletedAt: null,
    };

    if (filters.title) {
      where.title = {
        contains: filters.title,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    if (filters.description) {
      where.description = {
        contains: filters.description,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    const total = await this.newsRepository.count(where);

    const data = await this.newsRepository.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const totalPages = Math.ceil(total / limit);

    const result: ListNewsResponseDto = {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

    this.cacheService.set(cacheKey, result, 5 * 60 * 1000);

    return result;
  }
}

