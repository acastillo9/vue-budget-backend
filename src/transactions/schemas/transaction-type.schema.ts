import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionTypeDocument = TransactionType & Document;

@Schema()
export class TransactionType {
  @Prop()
  _id: string;

  @Prop()
  description: string;
}

export const TransactionTypeSchema =
  SchemaFactory.createForClass(TransactionType);
