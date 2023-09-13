import { HttpException, HttpStatus } from '@nestjs/common';

export class UsersException extends HttpException {
  constructor() {
    super('This is my custom exception', HttpStatus.BAD_REQUEST);
  }
}
