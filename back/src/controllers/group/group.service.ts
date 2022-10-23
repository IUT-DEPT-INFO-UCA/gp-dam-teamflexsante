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

  /**
   * Get group of a user (see associated controller)
   * @param {string} token the token of the user
   * @returns a list of users
   */
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

  /**
   * Send a notification to a user (see associated controller)
   * @param {string} token the token of the user
   * @param {string} email the email of the user to notify
   * @returns the user notified
   */
  async requestGroup(token: string, email: string) {
    const user = await this.userModel.findOne({ token });
    const userToNotify = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('Connected user not found', 400);
    }

    if (!userToNotify) {
      throw new HttpException('No user associated to this email', 400);
    }

    if (user.role === Role.PATIENT) {
      userToNotify.notifications.push({
        id: generateRandomToken(),
        type: 'addRequest',
        from: user,
        date: new Date(),
      });

      return userToNotify.save();
    } else {
      userToNotify.notifications.push({
        id: generateRandomToken(),
        type: 'joinRequest',
        from: user,
        date: new Date(),
      });

      return userToNotify.save();
    }
  }

  /**
   * Accept a request to join or add a user to a group (see associated controller)
   * @param {string} token the token of the user
   * @param {string} email the email of the user to add
   * @param {string} notificationId the id of the notification
   * @returns the user added
   */
  async acceptGroup(token: string, email: string, notificationId: string) {
    const user = await this.userModel.findOne({ token });
    const user2 = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('Connected user not found', 400);
    }

    if (!user2) {
      throw new HttpException('No user associated to this email', 400);
    }

    if (user.role === Role.PATIENT) {
      user.group.push(user2);
      user2.group.push(user);
      user.notifications = user.notifications.filter(
        (n) => n.id !== notificationId,
      );

      await user2.save();
      return user.save();
    } else {
      user.group.push(user2);
      user2.group.push(user);
      user.notifications = user.notifications.filter(
        (n) => n.id !== notificationId,
      );

      await user.save();
      return user2.save();
    }
  }
}
