import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';

export type UserDocument = User & Document;

export type Notification = {
  id: string;
  type: string;
  from: User;
  date: Date;
};

export enum TypeOfPain {
  'Head',
  'Neck',
  'Shoulder',
  'Back',
  'Elbow',
  'Wrist',
}

type Data = {
  number: number;
  date: Date;
};

export type FeelingData = {
  date: Date;
  tiredness: number;
  stress: number;
  happiness: number;
  anxiety: number;
  pain: TypeOfPain[];
};

export type Health = {
  heartRate: Data[];
  bloodPressure: {
    date: Date;
    systolic: number;
    diastolic: number;
  }[];
  bloodOxygen: Data[];
  temperature: Data[];
  sleep: Data[];
  stress: Data[];
  feeling: FeelingData[];
};

export enum Role {
  PATIENT = 'patient',
  FAMILY = 'family',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
}

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id?: string;

  @Prop({ required: true, enum: Role })
  role: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ required: true, enum: ['men', 'women', 'other'] })
  gender: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  token?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  group: User[];

  @Prop()
  notifications: Notification[];

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    default: {
      heartRate: [],
      bloodPressure: [],
      bloodOxygen: [],
      temperature: [],
      sleep: [],
      stress: [],
      feeling: [],
    },
  })
  health: Health;

  @Prop({ default: now() })
  createdAt?: Date;

  @Prop({ default: now() })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
