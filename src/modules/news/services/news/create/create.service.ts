import { Injectable } from '@nestjs/common';
import { ICreateService } from './create.interface';
import { CreateNewsRequestDto } from '../../../dtos/news/create-news.request.dto';
import { NewsRepository } from '../../../repositories/news/news.repository';
import { News } from '../../../types/news.types';

@Injectable()
export class CreateService implements ICreateService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(data: CreateNewsRequestDto): Promise<News> {
    return this.newsRepository.create(data);
  }
}

