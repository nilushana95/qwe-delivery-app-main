import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type DeliveryDocument = Delivery & Document;

@Schema()
export class Delivery {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Route',
    required: true,
  })
  route: string;

  @Prop({ required: true })
  package: string;

  @Prop({ required: true })
  vehicle: string;

  @Prop({ required: true })
  team: string;

  @Prop({ required: true })
  status: string;
}
export const DeliverySchema = SchemaFactory.createForClass(Delivery);
