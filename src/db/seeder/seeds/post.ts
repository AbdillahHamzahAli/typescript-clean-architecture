import { posts, type NewPost } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

const path = "src/db/seeder/data/post.json";
const file = Bun.file(path);
const data = await file.json();

export const seedPosts = async () => {
  for (const post of data) {
    const existingPost = await db.select().from(posts).where(eq(posts.slug, post.slug));
    if (existingPost.length === 0) {
      await db.insert(posts).values(post);
    }
  }
};
