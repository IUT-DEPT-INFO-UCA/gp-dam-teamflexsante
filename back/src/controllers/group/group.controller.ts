import { Controller, Get, Post, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import { Request } from 'express';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  async getGroup(@Req() request: Request) {
    const { authorization } = request.headers;

    return {
      message: '1',
      result: await this.groupService.getGroup(authorization as string),
    };
  }

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

  @Post('accept/add')
  async acceptAddUserToMyGroup(@Req() request: Request) {
    const { authorization } = request.headers;
    const { email } = request.body;

    return {
      message: '4',
      result: await this.groupService.acceptAddUserToMyGroup(
        authorization as string,
        email,
      ),
    };
  }

  @Post('accept/join')
  async acceptJoinGroupOfUser(@Req() request: Request) {
    const { authorization } = request.headers;
    const { email } = request.body;

    return {
      message: '5',
      result: await this.groupService.acceptJoinGroupOfUser(
        authorization as string,
        email,
      ),
    };
  }
}
