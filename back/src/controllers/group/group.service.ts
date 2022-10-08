import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateRandomToken } from '../../utils/token';
import { Role, User, UserDocument } from '../../schemas/user.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getGroup(token: string) {
    const user = await this.userModel.findOne({ token });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    if (user.role === Role.PATIENT) {
      return user.group;
    } else {
      return this.userModel.find({
        role: Role.PATIENT,
        group: { $elemMatch: { $eq: user } },
      });
    }
  }

  async requestAddUserToMyGroup(token: string, email: string) {
    const user = await this.userModel.findOne({ token });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    if (user.role !== Role.PATIENT) {
      throw new HttpException(
        'User is not a patient so cannot request user to join his group',
        400,
      );
    }

    const userToNotify = await this.userModel.findOne({ email });

    if (!userToNotify) {
      throw new HttpException('User to add not found', 400);
    }

    if (userToNotify.role === Role.PATIENT) {
      throw new HttpException(
        'User is a patient so cannot be added to a group',
        400,
      );
    }

    userToNotify.notifications.push({
      id: generateRandomToken(),
      type: 'addRequest',
      from: user,
      date: new Date(),
    });

    return userToNotify.save();
  }

  async requestJoinGroupOfUser(token: string, email: string) {
    const user = await this.userModel.findOne({ token });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    if (user.role === Role.PATIENT) {
      throw new HttpException(
        'User is a patient so cannot request to join a group',
        400,
      );
    }

    const userToNotify = await this.userModel.findOne({ email });

    if (!userToNotify) {
      throw new HttpException('User to join not found', 400);
    }

    if (userToNotify.role !== Role.PATIENT) {
      throw new HttpException(
        'User is not a patient so cannot handle a group',
        400,
      );
    }

    userToNotify.notifications.push({
      id: generateRandomToken(),
      type: 'joinRequest',
      from: user,
      date: new Date(),
    });

    return userToNotify.save();
  }

  async acceptAddUserToMyGroup(
    token: string,
    email: string,
    notificationId: string,
  ) {
    const user = await this.userModel.findOne({ token });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    if (user.role !== Role.PATIENT) {
      throw new HttpException(
        'User is not a patient so cannot accept add request',
        400,
      );
    }

    if (user.notifications.find((n) => n.id === notificationId) === undefined) {
      throw new HttpException('Notification not found', 400);
    }

    const userToAdd = await this.userModel.findOne({ email });

    if (!userToAdd) {
      throw new HttpException('User to add not found', 400);
    }

    if (userToAdd.role === Role.PATIENT) {
      throw new HttpException(
        'User is a patient so cannot be added to a group',
        400,
      );
    }

    user.group.push(userToAdd);
    user.notifications = user.notifications.filter(
      (n) => n.id !== notificationId,
    );

    return user.save();
  }

  async acceptJoinGroupOfUser(
    token: string,
    email: string,
    notificationId: string,
  ) {
    const user = await this.userModel.findOne({ token });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    if (user.role === Role.PATIENT) {
      throw new HttpException(
        'User is a patient so cannot accept join request',
        400,
      );
    }

    if (user.notifications.find((n) => n.id === notificationId) === undefined) {
      throw new HttpException('Notification not found', 400);
    }

    const userToJoin = await this.userModel.findOne({ email });

    if (!userToJoin) {
      throw new HttpException('User to join not found', 400);
    }

    if (userToJoin.role !== Role.PATIENT) {
      throw new HttpException(
        'User is not a patient so cannot join a group',
        400,
      );
    }

    userToJoin.group.push(user);
    user.notifications = user.notifications.filter(
      (n) => n.id !== notificationId,
    );

    await user.save();
    return userToJoin.save();
  }
}
