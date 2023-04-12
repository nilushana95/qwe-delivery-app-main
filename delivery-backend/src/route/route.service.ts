import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRouteDto } from './route.dto';
import { Route, RouteDocument } from './route.schema';

@Injectable()
export class RouteService {
  constructor(
    @InjectModel(Route.name)
    private readonly routeModel: Model<RouteDocument>,
  ) {}

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    try {
      const data = new this.routeModel(createRouteDto);
      return data.save();
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<any> {
    try {
      return this.routeModel.find().exec();
    } catch {
      throw new HttpException('Error getting list', HttpStatus.BAD_REQUEST);
    }
  }
  async remove(id: string) {
    try {
      const result = await this.routeModel.deleteOne({ _id: id });
      if (result && result.deletedCount === 1) {
        return { message: 'Route deleted!' };
      }
      return { message: 'No route found!' };
    } catch (e) {
      console.log('delete route failed ', e);
      throw new HttpException('Error route delivery', HttpStatus.BAD_REQUEST);
    }
  }
  async update(id: string, data: CreateRouteDto): Promise<any> {
    try {
      const result = await this.routeModel.updateOne({ _id: id }, { ...data });
      if (result && result.nModified === 1) {
        return { message: 'Route updated!' };
      }
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }
}
