import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserInterface, UserLoginInterface } from './user.interface';
import { Health, Role, User, UserDocument } from '../../schemas/user.schema';
import { generateRandomToken } from '../../utils/token';
import { checkPasswordStrength } from '../../utils/validation';
import {
  controlRandomData,
  generateRandomData,
  generateStrangeData,
} from '../../utils/data';

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
    const { email } = user;
    if (
      !user.firstname ||
      !user.lastname ||
      !email ||
      !user.password ||
      !user.gender ||
      !user.birthdate ||
      !user.phone ||
      !user.address ||
      !user.role
    ) {
      throw new HttpException('Missing required fields', 400);
    }
    if (await this.userModel.findOne({ email })) {
      throw new HttpException('User already exists', 400);
    }
    await checkPasswordStrength(user.password);
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hashedPassword;
    user._id = new mongoose.Types.ObjectId().toHexString();
    return new this.userModel(user).save();
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

    if (!(await bcrypt.compare(password, userFound.password))) {
      throw new HttpException('Invalid password', 400);
    }

    userFound.token = generateRandomToken();
    return await userFound.save();
  }

  /**
   * Connect a user to the application with a token
   * @param {string} token the user token
   * @returns the connected user
   */
  async getUserByToken(token: string): Promise<UserDocument> {
    const userFound = await this.userModel.findOne({ token });
    if (!userFound) throw new HttpException('User not found', 400);
    return userFound;
  }

  /**
   * Return user data
   * @param {string} id the user id
   * @returns the user
   */
  async getUserById(id: string): Promise<UserDocument> {
    const userFound = await this.userModel.findById(id);
    if (!userFound) throw new HttpException('User not found', 400);
    return userFound;
  }

  /**
   * Generate 1 year of fake data for all the patient
   * @returns a boolean
   */
  async generate(): Promise<boolean> {
    try {
      const patients = await this.userModel.find({ role: Role.PATIENT });

      await Promise.all(
        patients.map(async (patient) => {
          const healthData = generateRandomData();
          patient.health = healthData;
          patient.markModified('health');
          return patient.save();
        }),
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async generateStrangeData(): Promise<boolean> {
    try {
      const patients = await this.userModel.find({ role: Role.PATIENT });

      await Promise.all(
        patients.map(async (patient) => {
          const healthData = generateStrangeData();
          patient.health = healthData;
          patient.markModified('health');
          return patient.save();
        }),
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  controlPatientData(patient: UserDocument): boolean {
    const { health } = patient;

    return controlRandomData(health);
  }

  /**
   * Get patient health data
   * @param id patient user id
   * @returns the patient health data
   */
  async getPatientData(id: string): Promise<Health> {
    const user = await this.getUserById(id);

    if (!user) throw new HttpException('User not found', 400);

    if (user.role !== Role.PATIENT) {
      throw new HttpException('User is not a patient', 400);
    }

    return user.health;
  }
}
