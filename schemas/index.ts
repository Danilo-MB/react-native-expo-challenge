import { z } from 'zod';

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const PostsSchema = z.array(PostSchema);
export type Post = z.infer<typeof PostSchema>;


export const CommentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  body: z.string(),
});

export const CommentsSchema = z.array(CommentSchema);
export type PostComment = z.infer<typeof CommentSchema>;

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  website: z.string(),
});

export const UsersSchema = z.array(UserSchema);
export type User = z.infer<typeof UserSchema>;
