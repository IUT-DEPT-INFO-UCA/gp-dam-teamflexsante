import { Controller, Post, Req, Get } from '@nestjs/common';
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

  @Get()
  async getUserByToken(@Req() request: Request) {
    const { authorization } = request.headers;

    return {
      message: '3',
      result: await this.userService.getUserByToken(authorization as string),
    };
  }

  @Post('feeling')
  async addFeeling(@Req() request: Request) {
    const { authorization } = request.headers;
    const { feeling } = request.body;

    return {
      message: '4',
      result: await this.userService.addFeeling(
        authorization as string,
        feeling,
      ),
    };
  }

  @Get('generate')
  async generate() {
    return {
      message: '5',
      result: await this.userService.generate(),
    };
  }
}
