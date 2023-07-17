import { randEmail, randFullName } from '@ngneat/falso';

// const user = { email: randEmail(), name: randFullName() };

const users: string[] = randFullName({ length: 10 });
const emails: string[] = randEmail({ length: 10 });

console.log(users);
console.log(emails);
