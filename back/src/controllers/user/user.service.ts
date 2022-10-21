import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserInterface, UserLoginInterface } from './user.interface';
import {
  FeelingData,
  Role,
  User,
  UserDocument,
} from '../../schemas/user.schema';
import { generateRandomToken } from '../../utils/token';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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

  async getUserByToken(token: string): Promise<UserDocument> {
    const userFound = await this.userModel.findOne({ token });
    if (!userFound) {
      throw new HttpException('User not found', 400);
    }

    return userFound;
  }

  async addFeeling(token: string, feeling: FeelingData): Promise<UserDocument> {
    const userFound = await this.userModel.findOne({ token });
    if (!userFound) {
      throw new HttpException('User not found', 400);
    }

    if (userFound.role !== Role.PATIENT) {
      throw new HttpException('User is not a patient', 400);
    }

    if (
      !feeling.date ||
      !feeling.tiredness ||
      !feeling.stress ||
      !feeling.happiness ||
      !feeling.anxiety
    ) {
      throw new HttpException('Missing required fields', 400);
    }

    userFound.health.feeling.push(feeling);
    userFound.markModified('health.feeling');
    return userFound.save();
  }

  async generate(): Promise<boolean> {
    try {
      const patients = await this.userModel.find({ role: Role.PATIENT });

      patients.forEach(async (patient) => {
        const heartRate = [];
        const bloodPressure = [];
        const bloodOxygen = [];
        const temperature = [];
        const sleep = [];
        const stress = [];

        for (let i = 0; i < 365; i++) {
          heartRate.push({
            date: new Date(new Date().setDate(new Date().getDate() - i)),
            value: Math.floor(Math.random() * 130) + 50,
          });
          bloodPressure.push({
            date: new Date(new Date().setDate(new Date().getDate() - i)),
            systolic: Math.floor(Math.random() * 40) + 90,
            diastolic: Math.floor(Math.random() * 30) + 60,
          });
          bloodOxygen.push({
            date: new Date(new Date().setDate(new Date().getDate() - i)),
            value: Math.floor(Math.random() * 15) + 85,
          });
          temperature.push({
            date: new Date(new Date().setDate(new Date().getDate() - i)),
            value: Math.floor(Math.random() * 350) + 365,
          });
          sleep.push({
            date: new Date(new Date().setDate(new Date().getDate() - i)),
            value: Math.floor(Math.random() * 10) + 1,
          });
          stress.push({
            date: new Date(new Date().setDate(new Date().getDate() - i)),
            value: Math.floor(Math.random() * 100),
          });
        }

        patient.health.heartRate = heartRate;
        patient.health.bloodPressure = bloodPressure;
        patient.health.bloodOxygen = bloodOxygen;
        patient.health.temperature = temperature;
        patient.health.sleep = sleep;
        patient.health.stress = stress;

        // for some reason I need to have a callback here to assure that all data is saved
        // otherwise it will only save the first patient
        patient.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Generated');
          }
        });
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
