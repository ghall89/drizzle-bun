import { sql, relations } from "drizzle-orm";
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

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const posts = sqliteTable("posts", {
  id: text("id")
    .$defaultFn(() => cuid())
    .primaryKey(),
  body: text("body"),
  postedById: text("posted_by_id"),
});

export const postRelations = relations(posts, ({ one }) => ({
  postedBy: one(users, {
    fields: [posts.postedById],
    references: [users.id],
  }),
}));

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
