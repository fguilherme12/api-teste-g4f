import { Injectable, NotFoundException } from '@nestjs/common';
import { IGetByIdService } from './get-by-id.interface';
import { NewsRepository } from '../../../repositories/news/news.repository';

@Injectable()
export class GetByIdService implements IGetByIdService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(id: string) {
    const news = await this.newsRepository.findById(id);

    if (!news) {
      throw new NotFoundException('News not found');
    }

    return news;
  }
}

