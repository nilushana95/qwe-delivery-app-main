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
import { RoleTypes } from 'src/auth/user.dto';
import { Auth } from 'src/common/auth.decorator';
import { MongoExceptionFilter } from 'src/common/exception';
import { CreateRouteDto } from './route.dto';
import { RouteService } from './route.service';

@Controller('route')
export class RouteController {
  constructor(private routeService: RouteService) {}
  @Get()
  @Auth()
  async getAll() {
    return await this.routeService.getAll();
  }

  @Post()
  @Auth(RoleTypes.ADMIN)
  @HttpCode(201)
  @UseFilters(MongoExceptionFilter)
  async create(@Body() createRouteDto: CreateRouteDto) {
    return await this.routeService.create(createRouteDto);
  }

  @Patch(':id')
  @Auth()
  @HttpCode(200)
  @UseFilters(MongoExceptionFilter)
  async update(@Param('id') id: string, @Body() data: CreateRouteDto) {
    return await this.routeService.update(id, data);
  }

  @Delete(':id')
  @Auth(RoleTypes.ADMIN)
  remove(@Param('id') id: string) {
    return this.routeService.remove(id);
  }
}
