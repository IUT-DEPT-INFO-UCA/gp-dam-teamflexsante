import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';

export type UserDocument = User & Document;

export type Notification = {
  id: string;
  type: string;
  from: User;
  date: Date;
};

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
  note: string;
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

export enum Gender {
  MEN = 'men',
  WOMEN = 'women',
  OTHER = 'other',
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

  @Prop({ required: true, enum: Gender })
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
