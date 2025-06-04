import { api } from './api';
import { UsersSchema, User } from '../schemas';
import { AxiosResponse } from 'axios';

export async function fetchUsers(): Promise<User[]> {
  const response: AxiosResponse<unknown> = await api.get('/users');
  const parsed = UsersSchema.safeParse(response.data);

  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid user data from API');
  }

  return parsed.data;
}
