import { api } from './api';
import { CommentsSchema, PostComment } from '../schemas';
import { AxiosResponse } from 'axios';


export async function fetchCommentsByPostId(postId: number): Promise<PostComment[]> {
  const response: AxiosResponse<unknown> = await api.get(`/posts/${postId}/comments`);

  const parsed = CommentsSchema.safeParse(response.data);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid comment data received from API');
  }

  return parsed.data;
}