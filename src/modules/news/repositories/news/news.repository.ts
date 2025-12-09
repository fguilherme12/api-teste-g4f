import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/core/repositories/base.repository';
import { PrismaService } from 'src/database/core/prisma.service';
import { INewsRepository } from './news.repository.interface';
import { News } from '../../types/news.types';

@Injectable()
export class NewsRepository
  extends BaseRepository<News>
  implements INewsRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'news', true);
  }
}

