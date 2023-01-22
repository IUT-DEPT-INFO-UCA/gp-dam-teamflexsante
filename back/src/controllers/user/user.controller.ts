import { Controller, Post, Get, Param, Body, Headers } from '@nestjs/common';
import { UserInterface, UserLoginInterface } from './user.interface';
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
  async register(@Body() user: UserInterface) {
    return {
      message: 'User created',
      result: await this.userService.create(user),
    };
  }

  /**
   * Connect a user
   * @param {Request} request
   * @returns the connected user
   */
  @Post('login')
  async login(@Body() user: UserLoginInterface) {
    return {
      message: 'User connected',
      result: await this.userService.login(user),
    };
  }

  /**
   * Get the user associated with the token
   * @param {Request} request
   * @returns the user
   */
  @Get()
  async getUserByToken(@Headers('authorization') token: string) {
    return {
      message: 'User found',
      result: await this.userService.getUserByToken(token),
    };
  }

  /**
   * Get the user associated with the id
   * @param {string} id
   * @returns the user
   */
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return {
      message: 'User found',
      result: await this.userService.getUserById(id),
    };
  }
}
