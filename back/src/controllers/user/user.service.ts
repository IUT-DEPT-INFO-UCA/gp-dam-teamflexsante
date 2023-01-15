import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserInterface, UserLoginInterface } from './user.interface';
import { User, UserDocument } from '../../schemas/user.schema';
import { generateRandomToken } from '../../utils/token';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Add a new user to the database
   * @param {UserInterface} user see User interface for more details
   * @returns the created user
   */
  async create(user: UserInterface): Promise<UserDocument> {
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
    } = user;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !gender ||
      !birthdate ||
      !phone ||
      !address ||
      !role
    ) {
      throw new HttpException('Missing required fields', 400);
    }

    if (await this.userModel.findOne({ email })) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({
      _id: new mongoose.Types.ObjectId(),
      firstname,
      lastname,
      email,
      password: hashedPassword,
      gender,
      birthdate,
      phone,
      address,
      role,
    });
    return newUser.save();
  }

  /**
   * Connect a user to the application
   * @param {UserLoginInterface} user email + password
   * @returns the connected user
   */
  async login(user: UserLoginInterface): Promise<UserDocument> {
    const { email, password } = user;
    const userFound = await this.userModel.findOne({ email });

    if (!userFound) {
      throw new HttpException('User not found', 400);
    }

    const isValid = await bcrypt.compare(password, userFound.password);
    if (!isValid) {
      throw new HttpException('Invalid password', 400);
    }

    userFound.token = generateRandomToken();

    return userFound.save();
  }

  /**
   * Connect a user to the application with a token
   * @param {string} token the user token
   * @returns the connected user
   */
  async getUserByToken(token: string): Promise<UserDocument> {
    const userFound = await this.userModel.findOne({ token });
    if (!userFound) {
      throw new HttpException('User not found', 400);
    }

    return userFound;
  }

  /**
   * Return user data
   * @param {string} id the user id
   * @returns the user
   */
  async getUserById(id: string): Promise<UserDocument> {
    const userFound = await this.userModel.findById(id);

    if (!userFound) {
      throw new HttpException('User not found', 400);
    }

    return userFound;
  }
}
