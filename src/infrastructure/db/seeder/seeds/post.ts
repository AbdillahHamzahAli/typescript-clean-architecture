import { posts, type NewPost } from "@/infrastructure/db/schema";
import { db } from "@/infrastructure/db/drizzleClient";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const path = "src/infrastructure/db/seeder/data/post.json";
const file = Bun.file(path);
const data = await file.json();

export const seedPosts = async () => {
  for (const post of data) {
    const existingPost = await db.select().from(posts).where(eq(posts.slug, post.slug));
    if (existingPost.length === 0) {
      post.id = randomUUID();
      await db.insert(posts).values(post);
    }
  }
};
