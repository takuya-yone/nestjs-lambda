import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersResolver } from './users.resolver';

@Module({
  controllers: [],
  providers: [PrismaService, UsersResolver],
})
export class UsersModule {}
