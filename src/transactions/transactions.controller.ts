import { Controller, Get, Post, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import TransactionDTO from './transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('types')
  async getTransactionTypes() {
    return this.transactionsService.findTransactionTypes();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveTransaction(@Request() req) {
    const body = req.body;
    const user = req.user;
    const transactionDTO = {
      description: body.description,
      amount: body.amount,
      date: new Date(body.date),
      transactionType: body.transactionType,
      user: user._id,
    };
    await this.transactionsService.save(transactionDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findTransactions(@Request() req) {
    return await this.transactionsService.find(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeTransaction(@Request() req, @Param() params) {
    return await this.transactionsService.remove(req.user._id, params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('balance')
  async getBalance(@Request() req) {
    return await this.transactionsService.getBalance(req.user._id);
  }
}
