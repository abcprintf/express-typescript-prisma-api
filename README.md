## Express + Typescript + Prisma API

## Init Prisma
```sh
npx prisma migrate dev --name init

// test querys
npx ts-node tests/prisma-script.ts

// monitor db
npx prisma studio
```