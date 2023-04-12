import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RouteDocument = Route & Document;

@Schema()
export class Route {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  destination: string;
}
export const RouteSchema = SchemaFactory.createForClass(Route);
