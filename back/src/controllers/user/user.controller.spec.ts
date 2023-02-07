import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { User, UserSchema } from '../../schemas/user.schema';
import { UserController } from './user.controller';
import { UserMock } from './user.mock';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let database: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Import env variables
        ConfigModule.forRoot(),
        // Database connexion
        MongooseModule.forRoot(process.env.DATABASE_URL_TEST + '_user'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    database = await module.get(getConnectionToken());
  });

  it('should test the register process of a user', async () => {
    const user = { ...UserMock };

    const result = await controller.register(user);

    expect(result.message).toBe('User created');
    expect(result.result).toHaveProperty('email', UserMock.email);
  });

  it('should test the register process of a user with an existing email', async () => {
    const user = { ...UserMock };

    await controller.register(user);

    try {
      await controller.register(user);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.message).toBe('User already exists');
    }
  });

  it('should test the register process of a user with missing fields', async () => {
    const user = { ...UserMock };

    try {
      await controller.register(user);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Missing required fields');
    }
  });

  it('should test the register process of a user with week password', async () => {
    const user = { ...UserMock };

    user.password = '1234567';

    try {
      await controller.register(user);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.message).toBe(
        'Password does not match the requirements. Please choose a stronger password.',
      );
    }
  });

  it('should test the login process of a user', async () => {
    const user = { ...UserMock };

    await controller.register(user);

    user.password = UserMock.password;

    const result = await controller.login(user);

    expect(result.message).toBe('User connected');
    expect(result.result).toHaveProperty('email', UserMock.email);
  });

  it('should test the login process of a user with wrong password', async () => {
    const user = { ...UserMock };

    await controller.register(user);

    user.password = 'wrongPassword';

    try {
      await controller.login(user);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Invalid password');
    }
  });

  it('should test the login process of a user with wrong email', async () => {
    const user = { ...UserMock };

    await controller.register(user);

    user.email = 'wrongEmail';

    try {
      await controller.login(user);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.message).toBe('User not found');
    }
  });

  it('should get a user by token', async () => {
    const user = { ...UserMock };

    const result = await controller.register(user);

    const result2 = await controller.getUserByToken(result.result.token);

    expect(result2.message).toBe('User found');
    expect(result2.result).toHaveProperty('email', UserMock.email);
  });

  it('should get a user by token with wrong token', async () => {
    try {
      await controller.getUserByToken('wrongToken');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(400);
      expect(error.message).toBe('User not found');
    }
  });

  it('should get a user by id', async () => {
    const user = { ...UserMock };

    const result = await controller.register(user);

    const result2 = await controller.getUserById(result.result._id);

    expect(result2.message).toBe('User found');
    expect(result2.result).toHaveProperty('email', UserMock.email);
  });

  it('should generate data for patients', async () => {
    const user = { ...UserMock };

    const result = await controller.register(user);

    await controller.generate();

    const registeredUser = await controller.getUserById(result.result._id);

    expect(registeredUser.result.health.heartRate.length).toBeGreaterThan(0);
    expect(registeredUser.result.health.bloodPressure.length).toBeGreaterThan(
      0,
    );
    expect(registeredUser.result.health.bloodOxygen.length).toBeGreaterThan(0);
    expect(registeredUser.result.health.temperature.length).toBeGreaterThan(0);
    expect(registeredUser.result.health.sleep.length).toBeGreaterThan(0);
    expect(registeredUser.result.health.stress.length).toBeGreaterThan(0);
  });

  it('should get data of patient', async () => {
    const user = { ...UserMock };

    const result = await controller.register(user);

    await controller.generate();

    const registeredUser = await controller.getUserById(result.result._id);

    const result2 = await controller.getPatientData(registeredUser.result._id);

    expect(result2.message).toBe('Patient data found');
    expect(result2.result).toHaveProperty('heartRate');
    expect(result2.result.heartRate.length).toBeGreaterThan(0);
  });

  afterEach(async () => {
    // drop database
    await database.dropDatabase();
    await database.close();
  });
});
