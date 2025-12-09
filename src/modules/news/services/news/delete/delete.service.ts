import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteService } from './delete.interface';
import { NewsRepository } from '../../../repositories/news/news.repository';

@Injectable()
export class DeleteService implements IDeleteService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(id: string): Promise<void> {
    const existingNews = await this.newsRepository.findById(id);

    if (!existingNews) {
      throw new NotFoundException('News not found');
    }

    await this.newsRepository.delete(id);
  }
}

