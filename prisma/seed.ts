type PostRecord = {
  title: string;
  content: string;
  published: boolean;
  uuid: string;
};

import {
  randEmail,
  randFullName,
  randMovie,
  randUrl,
  randBoolean,
} from '@ngneat/falso';
import { v4 as uuidv4 } from 'uuid';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const upsertUserRecord = async (): Promise<void> => {
  const users: string[] = randFullName({ length: 20 });
  for (const user of users) {
    const email: string = randEmail();
    const x: number = Math.floor(Math.random() * 9) + 1;
    const posts: PostRecord[] = [];

    for (let i = 0; i < x; i++) {
      const tmp = {
        title: randMovie(),
        content: randUrl(),
        published: randBoolean(),
        uuid: uuidv4(),
      };
      posts.push(tmp);
    }

    const record = await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email: email,
        name: user,
        uuid: uuidv4(),
        posts: {
          create: posts,
        },
      },
    });
    console.log(record);
  }
};

const createHealthRecord = async (): Promise<void> => {
  const record = await prisma.health.create({
    data: {
      message: 'E2E health check is OK',
    },
  });
  console.log(record);
};

const main = async (): Promise<void> => {
  upsertUserRecord();
  createHealthRecord();
};

// main logic
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
