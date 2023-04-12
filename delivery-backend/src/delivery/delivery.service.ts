import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeliveryDto } from './delivery.dto';
import { Delivery, DeliveryDocument } from './delivery.schema';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery.name)
    private readonly deliveryModel: Model<DeliveryDocument>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    try {
      const data = new this.deliveryModel(createDeliveryDto);
      return data.save();
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, createDeliveryDto: CreateDeliveryDto): Promise<any> {
    try {
      const result = await this.deliveryModel.updateOne(
        { _id: id },
        { ...createDeliveryDto },
      );
      if (result && result.nModified === 1) {
        return { message: 'Delivery updated!' };
      }
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<any> {
    try {
      return this.deliveryModel.find().populate('route').exec();
    } catch {
      throw new HttpException('Error getting list', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.deliveryModel.deleteOne({ _id: id });
      if (result && result.deletedCount === 1) {
        return { message: 'Delivery deleted!' };
      }
      return { message: 'No delivery found!' };
    } catch (e) {
      console.log('delete delivery failed ', e);
      throw new HttpException(
        'Error deleting delivery',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
