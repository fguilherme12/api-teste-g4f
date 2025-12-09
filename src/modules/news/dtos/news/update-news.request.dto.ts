import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateNewsRequestDto {
  @ApiProperty({
    description: 'Título da notícia',
    maxLength: 255,
    example: 'Nova tecnologia revoluciona o mercado',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Título deve ser uma string' })
  @MaxLength(255, { message: 'Título deve ter no máximo 255 caracteres' })
  title?: string;

  @ApiProperty({
    description: 'Descrição da notícia',
    example: 'Uma nova tecnologia está transformando o mercado...',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  description?: string;
}

