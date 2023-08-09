import { Injectable, HttpCode, Redirect } from '@nestjs/common';
import { Post, Res, HttpStatus } from '@nestjs/common';

export interface redirectObj {
  url: string;
  statusCode: number;
}

@Injectable()
export class RedirectService {
  getRedirect(obj: redirectObj) {
    return obj;
  }
}
