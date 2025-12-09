import { Module } from '@nestjs/common';
import { NewsController } from './controllers/news/news.controller';
import { NewsRepository } from './repositories/news/news.repository';
import { CreateService } from './services/news/create/create.service';
import { GetByIdService } from './services/news/get-by-id/get-by-id.service';
import { ListService } from './services/news/list/list.service';
import { UpdateService } from './services/news/update/update.service';
import { DeleteService } from './services/news/delete/delete.service';
import { CacheService } from '../../common/core/cache/cache.service';

@Module({
  controllers: [NewsController],
  providers: [
    NewsRepository,
    CreateService,
    GetByIdService,
    ListService,
    UpdateService,
    DeleteService,
    CacheService,
  ],
  exports: [NewsRepository],
})
export class NewsModule {}

