import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { TransactionType } from './transaction-type.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  amount: number;

  @Prop()
  description: string;

  @Prop({ type: Date })
  date: Date;

  @Prop({ type: String, ref: 'TransactionType' })
  transactionType: TransactionType;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
