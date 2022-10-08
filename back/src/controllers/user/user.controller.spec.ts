import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpMocks = require('node-mocks-http');

import { TypeOfPain, User, UserSchema } from '../../schemas/user.schema';
import { UserController } from './user.controller';
import { UserMock } from './user.mock';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let database: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Import env variables
        ConfigModule.forRoot(),
        // Database connexion
        MongooseModule.forRoot(process.env.DATABASE_URL_TEST),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    database = await module.get(getConnectionToken());
  });

  it('should create a new user', async () => {
    const user = UserMock;
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/user/register',
      body: user,
    });

    expect(await controller.register(req)).toHaveProperty('result._id');
  });

  it('should login a user', async () => {
    const user = UserMock;
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/user/login',
      body: user,
    });

    expect(await controller.login(req)).toHaveProperty('result._id');
  });

  it('should get a user by token', async () => {
    const user = UserMock;
    const userFromDb = await database
      .model('User')
      .findOne({ email: user.email });
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/user',
      headers: {
        authorization: userFromDb.token,
      },
    });

    expect(await controller.getUserByToken(req)).toHaveProperty('result._id');
  });

  it('should post a new feeling', async () => {
    const user = UserMock;
    const userFromDb = await database
      .model('User')
      .findOne({ email: user.email });
    const req = httpMocks.createRequest({
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
          pain: [TypeOfPain.Back],
        },
      },
    });

    expect(await controller.addFeeling(req)).toHaveProperty(
      'result.health.feeling[0].date',
    );
  });

  afterAll(async () => {
    // drop database
    await database.dropDatabase();
    await database.close();
  });
});
