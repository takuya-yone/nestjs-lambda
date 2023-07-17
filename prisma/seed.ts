interface PostRecord {
  title: string;
  content: string;
  published: boolean;
}

import {
  randEmail,
  randFullName,
  rand,
  seed,
  randSuperhero,
  randMovie,
  randUrl,
  randBoolean,
} from '@ngneat/falso';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const users: string[] = randFullName({ length: 20 });

async function main() {
  for (const user of users) {
    const email: string = randEmail();
    const x: number = Math.floor(Math.random() * 9) + 1;
    const posts: PostRecord[] = [];

    for (let i = 0; i < x; i++) {
      const tmp = {
        title: randMovie(),
        content: randUrl(),
        published: randBoolean(),
      };
      posts.push(tmp);
    }

    const record = await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email: email,
        name: user,
        posts: {
          create: posts,
        },
      },
    });
    console.log(record);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
