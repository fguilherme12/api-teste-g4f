import { IsOptional, IsString } from 'class-validator';
import { BasePaginationDto } from 'src/common/core/dtos/base-pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListNewsRequestDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filtrar por título (busca parcial)',
    example: 'tecnologia',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filtrar por descrição (busca parcial)',
    example: 'inovação',
  })
  description?: string;
}

