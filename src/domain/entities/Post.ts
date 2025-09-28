export class Post {
  constructor(public id: string, public title: string, public slug: string, public thubmnail: string, public content: string, public authorId: string, public createdAt?: Date, public updatedAt?: Date) {
    if (title.trim().length < 3) throw new Error("Title must be at least 3 characters");
  }
}
