import { Module } from '@nestjs/common';
import { PrismaProvider } from 'src/prisma/prisma.provider';
import { UsersResolver } from './users.resolver';

@Module({
  controllers: [],
  providers: [PrismaProvider, UsersResolver],
})
export class UsersModule {}
