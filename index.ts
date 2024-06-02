import { faker } from "@faker-js/faker";
import { parseArgs } from "util";

import db from "./src/db";
import { users } from "./src/schema";
import type { NewUser } from "./src/schema";

const addData = async () => {
  for (let i = 0; i < 10; i++) {
    const newUser: NewUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      birthday: faker.date.birthdate().toString(),
    };

    await db.insert(users).values(newUser);
  }
};

const readData = () => {
  const data = db.select().from(users).all();

  console.log(data);
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
