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
   * Generate 1 year of fake data for all the patient
   * @returns a boolean
   */
  @Get('generate')
  async generate() {
    return {
      message: 'Data generated',
      result: await this.userService.generate(),
    };
  }

  /**
   * Get patient health data
   * @param id patient user id
   * @returns the patient health data
   */
  @Get('patient/:id')
  async getPatientData(@Param('id') id: string) {
    return {
      message: 'Patient data found',
      result: await this.userService.getPatientData(id),
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
