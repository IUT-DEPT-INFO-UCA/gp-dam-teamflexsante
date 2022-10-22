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
   * Send a notification to a user to join the group of the patient user
   * @param {Request} request
   * @returns {Promise<{message: string; result: User}>} The notified user
   */
  @Post('request/add')
  async requestAddUserToMyGroup(@Req() request: Request) {
    const { authorization } = request.headers;
    const { email } = request.body;

    return {
      message: '2',
      result: await this.groupService.requestAddUserToMyGroup(
        authorization as string,
        email,
      ),
    };
  }

  /**
   * Send a notification to the patient to ask to join his group
   * @param {Request} request
   * @returns {Promise<{message: string; result: User}>} The notified user
   */
  @Post('request/join')
  async requestJoinGroupOfUser(@Req() request: Request) {
    const { authorization } = request.headers;
    const { email } = request.body;

    return {
      message: '3',
      result: await this.groupService.requestJoinGroupOfUser(
        authorization as string,
        email,
      ),
    };
  }

  /**
   * Accept to add a member to the connected patient user
   * @param {Request} request
   * @returns {Promise<{message: string; result: User}>} The notified user
   */
  @Post('accept/add')
  async acceptAddUserToMyGroup(@Req() request: Request) {
    const { authorization } = request.headers;
    const { email, notificationId } = request.body;

    return {
      message: '4',
      result: await this.groupService.acceptAddUserToMyGroup(
        authorization as string,
        email,
        notificationId,
      ),
    };
  }

  /**
   * Accept the request to join the group of the patient user
   * @param {Request} request
   * @returns {Promise<{message: string; result: User}>} The notified user
   */
  @Post('accept/join')
  async acceptJoinGroupOfUser(@Req() request: Request) {
    const { authorization } = request.headers;
    const { email, notificationId } = request.body;

    return {
      message: '5',
      result: await this.groupService.acceptJoinGroupOfUser(
        authorization as string,
        email,
        notificationId,
      ),
    };
  }
}
