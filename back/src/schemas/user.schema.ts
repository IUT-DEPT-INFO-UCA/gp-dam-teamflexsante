import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';

export type UserDocument = User & Document;

export type Notification = {
  id: string;
  type: string;
  from: User;
  date: Date;
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

  @Prop({ default: now() })
  createdAt?: Date;

  @Prop({ default: now() })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
