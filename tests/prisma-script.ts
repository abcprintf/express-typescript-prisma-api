import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /**
   * create user
   */
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "devmix",
  //       email: "devmix@gmail.com",
  //       password: "12345678",
  //     },
  //   });
  //   console.log(user);
  /**
   * get user
   */
  //   const users = await prisma.user.findMany();
  //   console.log(users);
  /**
   * create user with posts
   */
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "test001",
  //       email: "test001@gmail.com",
  //       password: "12345678",
  //       posts: {
  //         create: [
  //           {
  //             title: "post 1",
  //             content: "post 1 content",
  //           },
  //           {
  //             title: "post 2",
  //             content: "post 2 content",
  //           },
  //         ],
  //       },
  //     },
  //   });
  //   console.log(user);
  /**
   * get posts data
   */
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.dir(usersWithPosts, { depth: null });
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
