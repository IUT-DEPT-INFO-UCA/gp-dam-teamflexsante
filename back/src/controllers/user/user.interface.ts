import { Health, Notification } from '../../schemas/user.schema';

export interface UserInterface {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: Date;
  gender: string;
  address: string;
  phone: string;
  role: string;
  group?: UserInterface[];
  notifications?: Notification[];
  health?: Health;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}
