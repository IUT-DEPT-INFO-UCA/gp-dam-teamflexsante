import { Controller, Post, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Register a new user
   * @param {Request} request
   * @returns the registered user
   */
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

  /**
   * Connect a user
   * @param {Request} request
   * @returns the connected user
   */
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

  /**
   * Get the user associated with the token
   * @param {Request} request
   * @returns the user
   */
  @Get()
  async getUserByToken(@Req() request: Request) {
    const { authorization } = request.headers;

    return {
      message: '3',
      result: await this.userService.getUserByToken(authorization as string),
    };
  }

  /**
   * Post a new feeling form
   * @param {Request} request
   * @returns the modified user
   */
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

  /**
   * Generate 1 year of fake data for all the patient
   * @returns a boolean
   */
  @Get('generate')
  async generate() {
    return {
      message: '5',
      result: await this.userService.generate(),
    };
  }
}
