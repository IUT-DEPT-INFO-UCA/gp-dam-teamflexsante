import { Role } from '../../schemas/user.schema';
import { UserInterface } from './user.interface';

export const UserMock: UserInterface = {
  _id: '5f9f1b9b9c9d440000a1b1b1',
  firstname: 'John',
  lastname: 'Doe',
  email: 'test@test.com',
  password: 'test',
  birthdate: new Date('1990-01-01'),
  gender: 'men',
  address: '1 rue de la paix',
  phone: '0606060606',
  role: Role.PATIENT,
  group: [],
  createdAt: new Date('2020-10-30T15:00:00.000Z'),
  updatedAt: new Date('2020-10-30T15:00:00.000Z'),
};

export const UserMockPatient: UserInterface = {
  ...UserMock,
  email: 'test3@test.com',
};

export const UserMockDoctor: UserInterface = {
  ...UserMock,
  email: 'test2@test.com',
  role: Role.DOCTOR,
};
