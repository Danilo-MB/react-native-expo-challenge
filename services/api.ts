import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { showErrorToast } from '../components/Toast';

const config: AxiosRequestConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const api: AxiosInstance = axios.create(config);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<never> => {
    if (error.response) {
      const status: number = error.response.status;

      const message: string =
        typeof error.response.data === 'object' &&
        error.response.data !== null &&
        'message' in error.response.data
          ? (error.response.data as { message: string }).message
          : 'An unexpected server error occurred.';

      switch (status) {
        case 400:
          showErrorToast(message, 'Bad Request');
          break;
        case 401:
          showErrorToast('Please log in again.', 'Unauthorized');
          break;
        case 404:
          showErrorToast('Resource not found.', 'Not Found');
          break;
        case 500:
          showErrorToast('Please try again later.', 'Server Error');
          break;
        default:
          showErrorToast(message, 'Error');
      }
    } else if (error.request) {
      showErrorToast('Network error. Please check your internet connection.', 'Network Error');
    } else {
      showErrorToast(error.message);
    }

    return Promise.reject(error);
  },
);

export { api };
