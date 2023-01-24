import { Gender, Role } from '../../schemas/user.schema';
import { UserInterface } from './user.interface';

export const UserMock: UserInterface = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'test@test.com',
  password: 'Azerty12',
  birthdate: new Date('1990-01-01'),
  gender: Gender.MEN,
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
