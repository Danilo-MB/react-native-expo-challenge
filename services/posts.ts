import { api } from './api';
import { PostsSchema, Post, PostSchema } from '../schemas';
import { AxiosResponse } from 'axios';

export async function fetchPosts(): Promise<Post[]> {
  const response: AxiosResponse<unknown> = await api.get('/posts');

  const parsed = PostsSchema.safeParse(response.data);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid post data received from API');
  }

  return parsed.data;
}

export async function fetchPostById(id: number): Promise<Post> {
  const response: AxiosResponse<unknown> = await api.get(`/posts/${id}`);

  const parsed = PostSchema.safeParse(response.data);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid post data received from API');
  }

  return parsed.data;
}
