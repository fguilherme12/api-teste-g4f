import { ApiProperty } from '@nestjs/swagger';

export class NewsResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  id: string;

  @ApiProperty({ example: 'Nova tecnologia revoluciona o mercado' })
  title: string;

  @ApiProperty({ example: 'Uma nova tecnologia está transformando o mercado...' })
  description: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: Date | null;
}

