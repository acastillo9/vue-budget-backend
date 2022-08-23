import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findUserByUsername(username);
    if (user) {
      // const saltOrRounds = 12;
      // const hash = await bcrypt.hash(pass, saltOrRounds);
      // console.log(pass, hash);
      const userPassword = user.password;
      user.password = undefined;
      return await bcrypt.compare(pass, userPassword);
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).select('+password').exec();
  }
}
