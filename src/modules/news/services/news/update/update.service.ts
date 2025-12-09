import { Injectable, NotFoundException } from '@nestjs/common';
import { IUpdateService } from './update.interface';
import { UpdateNewsRequestDto } from '../../../dtos/news/update-news.request.dto';
import { NewsRepository } from '../../../repositories/news/news.repository';

@Injectable()
export class UpdateService implements IUpdateService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(id: string, data: UpdateNewsRequestDto) {
    const existingNews = await this.newsRepository.findById(id);

    if (!existingNews) {
      throw new NotFoundException('News not found');
    }

    return this.newsRepository.update(id, data);
  }
}

