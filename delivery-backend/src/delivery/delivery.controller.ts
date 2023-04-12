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
import { CreateDeliveryDto } from './delivery.dto';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}
  @Post()
  @Auth(RoleTypes.ADMIN)
  @HttpCode(201)
  @UseFilters(MongoExceptionFilter)
  async createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return await this.deliveryService.create(createDeliveryDto);
  }
  @Get()
  @Auth()
  async getAll() {
    return await this.deliveryService.getAll();
  }

  @Patch(':id')
  @Auth()
  @HttpCode(200)
  @UseFilters(MongoExceptionFilter)
  async updateDelivery(
    @Param('id') id: string,
    @Body() createDeliveryDto: CreateDeliveryDto,
  ) {
    return await this.deliveryService.update(id, createDeliveryDto);
  }

  @Delete(':id')
  @Auth(RoleTypes.ADMIN)
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(id);
  }
}
