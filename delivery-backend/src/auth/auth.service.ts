import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreateUserDto, LoginData } from './user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }
  async getAll(): Promise<any> {
    try {
      return this.userModel.find().select('-password').exec();
    } catch {
      throw new HttpException('Error getting list', HttpStatus.BAD_REQUEST);
    }
  }

  async login(data: LoginData): Promise<{ token?: string; data: any }> {
    const user: CreateUserDto = await this.userModel
      .findOne({ userName: data.userName })
      .exec();
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (isMatch) {
      const payload = {
        userName: user.userName,
        role: user.role,
        lastName: user.lastName,
        firstName: user.firstName,
        id: user._id,
      };
      const token = this.jwtService.sign(payload);
      return { data: payload, token };
    } else {
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  async remove(id: string) {
    try {
      const result = await this.userModel.deleteOne({ _id: id });
      if (result && result.deletedCount === 1) {
        return { message: 'User deleted!' };
      }
      return { message: 'No user found!' };
    } catch (e) {
      console.log('delete user failed ', e);
      throw new HttpException('Error user delivery', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, data: CreateUserDto): Promise<any> {
    try {
      const result = await this.userModel.updateOne({ _id: id }, { ...data });
      if (result && result.nModified === 1) {
        return { message: 'User updated!' };
      }
    } catch {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }
}
