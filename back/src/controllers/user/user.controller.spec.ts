import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpMocks = require('node-mocks-http');

import { User, UserSchema } from '../../schemas/user.schema';
import { UserController } from './user.controller';
import { UserMock } from './user.mock';
import { UserService } from './user.service';

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
    const user = UserMock;
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/user/register',
      body: user,
    });

    expect(await controller.register(req)).toHaveProperty('result._id');

    const req1 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/register',
      body: user,
    });

    await expect(controller.register(req1)).rejects.toThrow(
      'User already exists',
    );
  });

  it('should test the login process of a user', async () => {
    const req1 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/register',
      body: UserMock,
    });

    await controller.register(req1);

    const req2 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/login',
      body: UserMock,
    });

    expect(await controller.login(req2)).toHaveProperty('result._id');

    const req3 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/login',
      body: {
        email: UserMock.email,
        password: 'wrongPassword',
      },
    });

    await expect(controller.login(req3)).rejects.toThrow('Invalid password');

    const req4 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/login',
      body: {
        email: 'wrongEmail',
        password: UserMock.password,
      },
    });

    await expect(controller.login(req4)).rejects.toThrow('User not found');
  });

  it('should get a user by token', async () => {
    const req1 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/register',
      body: UserMock,
    });

    await controller.register(req1);

    const req2 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/login',
      body: UserMock,
    });

    await controller.login(req2);

    const userFromDb = await database
      .model('User')
      .findOne({ email: UserMock.email });

    const req3 = httpMocks.createRequest({
      method: 'GET',
      url: '/user',
      headers: {
        authorization: userFromDb.token,
      },
    });

    expect(await controller.getUserByToken(req3)).toHaveProperty('result._id');

    const req4 = httpMocks.createRequest({
      method: 'GET',
      url: '/user',
      headers: {
        authorization: 'wrongToken',
      },
    });

    await expect(controller.getUserByToken(req4)).rejects.toThrow(
      'User not found',
    );
  });

  it('should post a new feeling', async () => {
    const req1 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/register',
      body: UserMock,
    });

    await controller.register(req1);

    const req2 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/login',
      body: UserMock,
    });

    await controller.login(req2);

    const userFromDb = await database
      .model('User')
      .findOne({ email: UserMock.email });

    const req3 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/feeling',
      headers: {
        authorization: userFromDb.token,
      },
      body: {
        feeling: {
          date: new Date(),
          tiredness: 1,
          stress: 2,
          happiness: 3,
          anxiety: 1,
          note: 'note',
        },
      },
    });

    expect(await controller.addFeeling(req3)).toHaveProperty(
      'result.health.feeling[0].date',
    );

    const req4 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/feeling',
      headers: {
        authorization: 'wrongToken',
      },
      body: {
        feeling: {
          date: new Date(),
          tiredness: 1,
          stress: 2,
          happiness: 3,
          anxiety: 1,
          note: 'note',
        },
      },
    });

    await expect(controller.addFeeling(req4)).rejects.toThrow('User not found');

    const req5 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/feeling',
      headers: {
        authorization: userFromDb.token,
      },
      body: {
        feeling: {
          date: new Date(),
          tiredness: 1,
          anxiety: 1,
          note: 'note',
        },
      },
    });

    await expect(controller.addFeeling(req5)).rejects.toThrow(
      'Missing required fields',
    );
  });

  it('should generate fake data for all patients', async () => {
    const res = await controller.generate();
    const result = res.result;
    expect(result).toBe(true);
  });

  afterEach(async () => {
    // drop database
    await database.dropDatabase();
    await database.close();
  });
});
