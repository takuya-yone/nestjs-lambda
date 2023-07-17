import {
  INestApplication,
  Injectable,
  OnModuleInit,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProvider
  extends PrismaClient
  implements OnModuleInit, BeforeApplicationShutdown
{
  async onModuleInit() {
    // console.log('onModuleInit');
    await this.$connect();
  }

  async beforeApplicationShutdown() {
    // console.log('beforeApplicationShutdown');
    await this.$disconnect();
  }

  //   async enableShutdownHooks(app: INestApplication) {
  //     this.$on('beforeExit', async () => {
  //       await app.close();
  //     });
  //   }
}
