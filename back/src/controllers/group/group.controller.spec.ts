import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpMocks = require('node-mocks-http');

import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserMockPatient, UserMockDoctor } from '../user/user.mock';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';

describe('GroupController', () => {
  let controller: GroupController;
  let userController: UserController;
  let database: any;
  let patient: any;
  let doctor: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Import env variables
        ConfigModule.forRoot(),
        // Database connexion
        MongooseModule.forRoot(process.env.DATABASE_URL_TEST),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [GroupController, UserController],
      providers: [GroupService, UserService],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    userController = module.get<UserController>(UserController);
    database = await module.get(getConnectionToken());

    const req1 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/register',
      body: UserMockPatient,
    });

    const req2 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/register',
      body: UserMockDoctor,
    });

    await userController.register(req1);
    await userController.register(req2);

    const req3 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/login',
      body: {
        email: UserMockPatient.email,
        password: UserMockPatient.password,
      },
    });

    const req4 = httpMocks.createRequest({
      method: 'POST',
      url: '/user/login',
      body: {
        email: UserMockDoctor.email,
        password: UserMockDoctor.password,
      },
    });

    const res3 = await userController.login(req3);
    const res4 = await userController.login(req4);
    patient = res3.result;
    doctor = res4.result;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a user to a group', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/group/accept/add',
      headers: {
        Authorization: patient.token,
      },
      body: {
        email: UserMockDoctor.email,
      },
    });

    const res = await controller.acceptAddUserToMyGroup(req);
    expect(res.result.group.length).toBe(1);
  });

  it('should get the group of a user', async () => {
    const req2 = httpMocks.createRequest({
      method: 'GET',
      url: '/group',
      headers: {
        authorization: patient.token,
      },
    });

    const group = await controller.getGroup(req2);
    expect(group.result.length).toBe(1);
  });

  afterAll(async () => {
    await database.dropDatabase();
    await database.close();
  });
});
