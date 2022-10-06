import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Req() request: Request) {
    const {
      firstname,
      lastname,
      email,
      password,
      gender,
      birthdate,
      phone,
      address,
      role,
    } = request.body;

    return {
      message: '1',
      result: await this.userService.create({
        firstname,
        lastname,
        email,
        password,
        gender,
        birthdate,
        phone,
        address,
        role,
      }),
    };
  }

  @Post('login')
  async login(@Req() request: Request) {
    const { email, password } = request.body;

    return {
      message: '2',
      result: await this.userService.login({
        email,
        password,
      }),
    };
  }
}
