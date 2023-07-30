import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { MembersService } from './members.service';
import { Member } from './members.interface';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
  @UseGuards(AuthGuard('local'))
  @Post()
  getMembers(@Req() request: Request): Member[] {
    return this.membersService.getMembers(request);
  }
  @Get(':id')
  getMember(
    @Req() request: Request,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Member | undefined {
    return this.membersService.getMember(request, id);
  }
}
