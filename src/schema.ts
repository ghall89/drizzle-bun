import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import cuid from "@bugsnag/cuid";

export const users = sqliteTable("users", {
  id: text("id")
    .$defaultFn(() => cuid())
    .primaryKey(),
  username: text("username"),
  email: text("email"),
  birthday: text("birthday"),
  createdDt: text("created_dt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
