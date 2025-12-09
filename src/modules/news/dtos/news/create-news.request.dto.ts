import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNewsRequestDto {
  @ApiProperty({
    description: 'Título da notícia',
    maxLength: 255,
    example: 'Nova tecnologia revoluciona o mercado',
  })
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @IsString({ message: 'Título deve ser uma string' })
  @MaxLength(255, { message: 'Título deve ter no máximo 255 caracteres' })
  title: string;

  @ApiProperty({
    description: 'Descrição da notícia',
    example: 'Uma nova tecnologia está transformando o mercado...',
  })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @IsString({ message: 'Descrição deve ser uma string' })
  description: string;
}

