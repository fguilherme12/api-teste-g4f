import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    roleId?: string;
  };
}

