import { Controller, Get, Post, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import { Request } from 'express';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  /**
   * If user is patient then retrieve all members, if user is doctor or nurse then retrieve all patients, if user is family then retrieve the patient
   * @param {Request} request
   * @returns {Promise<{message: string; result: [User]}>} List of users
   */
  @Get()
  async getGroup(@Req() request: Request) {
    const { authorization } = request.headers;

    return {
      message: '1',
      result: await this.groupService.getGroup(authorization as string),
    };
  }

  /**
   * Send a notification related to group to a user
   * @param {Request} request
   * @returns {Promise<{message: string; result: User}>} The notified user
   */
  @Post('request')
  async requestGroup(@Req() request: Request) {
    const { authorization } = request.headers;
    const { email } = request.body;

    return {
      message: '2',
      result: await this.groupService.requestGroup(
        authorization as string,
        email,
      ),
    };
  }

  /**
   * Accept to join or add a user to a group
   * @param {Request} request
   * @returns {Promise<{message: string; result: User}>} The notified user
   */
  @Post('accept')
  async acceptGroup(@Req() request: Request) {
    const { authorization } = request.headers;
    const { email, notificationId } = request.body;

    return {
      message: '4',
      result: await this.groupService.acceptGroup(
        authorization as string,
        email,
        notificationId,
      ),
    };
  }
}
