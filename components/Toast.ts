import Toast, { ToastShowParams } from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ShowToastOptions {
  type: ToastType;
  title: string;
  message: string;
  position?: 'top' | 'bottom';
}

export function showToast({ type, title, message, position = 'top' }: ShowToastOptions): void {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position,
  } satisfies ToastShowParams);
}

export function showErrorToast(message: string, title = 'Error'): void {
  showToast({ type: 'error', title, message });
}

export function showSuccessToast(message: string, title = 'Success'): void {
  showToast({ type: 'success', title, message });
}
