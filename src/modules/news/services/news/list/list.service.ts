import { Injectable } from '@nestjs/common';
import { IListService } from './list.interface';
import { NewsRepository } from '../../../repositories/news/news.repository';

@Injectable()
export class ListService implements IListService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute() {
    return this.newsRepository.findAll();
  }
}

