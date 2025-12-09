import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateService } from '../../services/news/create/create.service';
import { GetByIdService } from '../../services/news/get-by-id/get-by-id.service';
import { ListService } from '../../services/news/list/list.service';
import { UpdateService } from '../../services/news/update/update.service';
import { DeleteService } from '../../services/news/delete/delete.service';
import { CreateNewsRequestDto } from '../../dtos/news/create-news.request.dto';
import { UpdateNewsRequestDto } from '../../dtos/news/update-news.request.dto';
import { NewsResponseDto } from '../../dtos/news/news.response.dto';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(
    private readonly createService: CreateService,
    private readonly getByIdService: GetByIdService,
    private readonly listService: ListService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new news' })
  @ApiResponse({ status: 201, description: 'News created successfully', type: NewsResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async create(@Body() data: CreateNewsRequestDto) {
    return this.createService.execute(data);
  }

  @Get()
  @ApiOperation({ summary: 'List all news' })
  @ApiResponse({ status: 200, description: 'List of news', type: [NewsResponseDto] })
  async list() {
    return this.listService.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news by ID' })
  @ApiResponse({ status: 200, description: 'News found', type: NewsResponseDto })
  @ApiResponse({ status: 404, description: 'News not found' })
  async getById(@Param('id') id: string) {
    return this.getByIdService.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update news' })
  @ApiResponse({ status: 200, description: 'News updated successfully', type: NewsResponseDto })
  @ApiResponse({ status: 404, description: 'News not found' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async update(@Param('id') id: string, @Body() data: UpdateNewsRequestDto) {
    return this.updateService.execute(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete news' })
  @ApiResponse({ status: 204, description: 'News deleted successfully' })
  @ApiResponse({ status: 404, description: 'News not found' })
  async delete(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }
}

