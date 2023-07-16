import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [],
  providers: [PrismaService, UserResolver],
})
export class UserModule {}
