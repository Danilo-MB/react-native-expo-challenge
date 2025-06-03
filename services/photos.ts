import { api } from './api';
import { Photo, PhotosSchema } from '../schemas';
import { AxiosResponse } from 'axios';


export async function fetchPhotos(): Promise<Photo[]> {
  const response: AxiosResponse<unknown> = await api.get('/photos');

  const parsed = PhotosSchema.safeParse(response.data);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid post data received from API');
  }

  return parsed.data;
}

// export const fetchPhotos = async (): Promise<Photo[]> => {
//   const res = await api.get('/photos');
//   return res.data;
// };

export const fetchPhotoById = async (id: number): Promise<Photo> => {
  const res = await api.get(`/photos/${id}`);
  return res.data;
};
