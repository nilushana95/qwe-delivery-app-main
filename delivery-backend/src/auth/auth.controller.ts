import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Auth } from 'src/common/auth.decorator';
import { MongoExceptionFilter } from 'src/common/exception';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginData, RoleTypes } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('user')
  @Auth(RoleTypes.ADMIN)
  @HttpCode(201)
  @UseFilters(MongoExceptionFilter)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @UseFilters(MongoExceptionFilter)
  async login(@Body() requestBody: LoginData) {
    return await this.authService.login(requestBody);
  }
  @Get('users')
  @Auth(RoleTypes.ADMIN)
  async getAll() {
    return await this.authService.getAll();
  }

  @Patch('user/:id')
  @Auth(RoleTypes.ADMIN)
  @HttpCode(200)
  @UseFilters(MongoExceptionFilter)
  async updateDelivery(@Param('id') id: string, @Body() data: CreateUserDto) {
    return await this.authService.update(id, data);
  }

  @Delete('user/:id')
  @Auth(RoleTypes.ADMIN)
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
