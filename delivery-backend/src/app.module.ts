import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RouteModule } from './route/route.module';
import { DeliveryModule } from './delivery/delivery.module';

const { DB_USER, DB_PASSWORD } = process.env;
const MONGO_URL = `mongodb+srv://${DB_USER || 'nilushanand'}:${
  DB_PASSWORD || 'xTx8BS4LpDJcDbK3'
}@delivery.izctr4y.mongodb.net/?retryWrites=true&w=majority`;
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_URL),
    AuthModule,
    RouteModule,
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
