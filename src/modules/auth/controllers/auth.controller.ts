import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginService } from '../services/auth/login/login.service';
import { GetCurrentUserService } from '../services/auth/get-current-user/get-current-user.service';
import { LoginRequestDto } from '../dtos/auth/login.request.dto';
import { LoginResponseDto } from '../dtos/auth/login.response.dto';
import { JwtAuthGuard } from '../../../common/guards/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly getCurrentUserService: GetCurrentUserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(@Body() data: LoginRequestDto) {
    return this.loginService.execute(data);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200 })
  async getCurrentUser(@Request() req) {
    return this.getCurrentUserService.execute(req.user.userId);
  }
}

