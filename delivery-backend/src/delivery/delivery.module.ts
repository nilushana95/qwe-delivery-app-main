import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthJwt } from 'src/auth/auth';
import { AuthGuard } from 'src/common/auth.gaurd';
import { DeliveryController } from './delivery.controller';
import { Delivery, DeliverySchema } from './delivery.schema';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Delivery.name, schema: DeliverySchema },
    ]),
    AuthJwt.config(),
  ],
  providers: [DeliveryService, AuthGuard],
  controllers: [DeliveryController],
})
export class DeliveryModule {}
