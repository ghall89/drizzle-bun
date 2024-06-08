import { faker } from "@faker-js/faker";
import { parseArgs } from "util";

import db from "./src/db";
import { users, posts } from "./src/schema";

const addData = async () => {
  for (let i = 0; i < 10; i++) {
    const [newUser] = await db
      .insert(users)
      .values({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        birthday: faker.date.birthdate().toString(),
      })
      .returning();

    await db.insert(posts).values({
      postedById: newUser.id,
      body: faker.lorem.text(),
    });
  }
};

const readData = async () => {
  try {
    const data = await db.query.users.findMany({
      with: {
        posts: true,
      },
    });

    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

const main = () => {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      create: {
        type: "boolean",
      },
    },
    strict: true,
    allowPositionals: true,
  });

  if (values.create) {
    addData();
  } else {
    readData();
  }
};

main();
