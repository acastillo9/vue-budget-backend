import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findProfileByUsername(username: string): Promise<User> {
    return this.userModel
      .findOne({ username }, { username: 1, name: 1 })
      .exec();
  }
}
