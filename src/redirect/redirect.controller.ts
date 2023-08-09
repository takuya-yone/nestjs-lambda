import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { RedirectService, redirectObj } from './redirect.service';

@Controller('redirect')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Get()
  @Redirect('https://nestjs.com', 301)
  getRedirect() {
    const obj: redirectObj = {
      url: 'https://docs.nestjs.com/v5/',
      statusCode: 301,
    };
    // console.log(request);
    return this.redirectService.getRedirect(obj);
    // return obj;
  }
}
