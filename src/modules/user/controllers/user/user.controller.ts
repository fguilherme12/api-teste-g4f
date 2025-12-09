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
import { RegisterService } from '../../services/user/register/register.service';
import { GetByIdService } from '../../services/user/get-by-id/get-by-id.service';
import { ListService } from '../../services/user/list/list.service';
import { UpdateService } from '../../services/user/update/update.service';
import { DeleteService } from '../../services/user/delete/delete.service';
import { RegisterUserRequestDto } from '../../dtos/user/register.request.dto';
import { UpdateUserRequestDto } from '../../dtos/user/update.request.dto';
import { UserResponseDto } from '../../dtos/user/user.response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly getByIdService: GetByIdService,
    private readonly listService: ListService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async register(@Body() data: RegisterUserRequestDto) {
    return this.registerService.execute(data);
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  async list() {
    return this.listService.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async getById(@Param('id') id: string) {
    return this.getByIdService.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async update(@Param('id') id: string, @Body() data: UpdateUserRequestDto) {
    return this.updateService.execute(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204 })
  async delete(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }
}

