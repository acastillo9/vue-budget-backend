import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  TransactionType,
  TransactionTypeDocument,
} from './schemas/transaction-type.schema';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import TransactionDTO from './transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(TransactionType.name)
    private transactionTypeModel: Model<TransactionTypeDocument>,
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async findTransactionTypes(): Promise<TransactionType[]> {
    return this.transactionTypeModel.find().exec();
  }

  async save(transactionDTO: TransactionDTO): Promise<Transaction> {
    if (transactionDTO.transactionType === 'O') {
      transactionDTO.amount *= -1;
    }
    const createTransaction = new this.transactionModel(transactionDTO);
    return await createTransaction.save();
  }

  async find(userId: string): Promise<Transaction[]> {
    return this.transactionModel
      .find({ user: userId }, { user: 0, __v: 0 })
      .exec();
  }

  async remove(userId: string, transactionId: string): Promise<void> {
    this.transactionModel
      .deleteOne({ _id: transactionId, user: userId })
      .exec();
  }

  async getBalance(userId: string): Promise<number> {
    const balanceAggregation = await this.transactionModel.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, balance: { $sum: '$amount' } } },
    ]);
    return balanceAggregation[0].balance;
  }
}
