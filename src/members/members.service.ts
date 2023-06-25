import { Injectable } from '@nestjs/common';
import { Member } from './members.interface';

@Injectable()
export class MembersService {
  private members: Member[] = [
    { id: 0, name: 'tanaka', age: 24, mail: 'tanaka@gmail.com' },
    { id: 1, name: 'suzuki', age: 28, mail: 'suzuki@gmail.com' },
    { id: 2, name: 'yamada', age: 55, mail: 'yamada@gmail.com' },
  ];
  getMembers(request: Request): Member[] {
    return this.members;
  }
  getMember(request: Request, id: number): Member | undefined {
    const member = this.members.find((member) => member.id == id);
    return member;
  }
}
