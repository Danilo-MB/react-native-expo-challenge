import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginModal from '../LoginModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

const mockLogin = jest.fn();
jest.mock('@/stores/authStore', () => ({
  useAuthStore: () => ({
    login: mockLogin,
  }),
}));

describe('LoginModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs in successfully and calls onLoginSuccess', async () => {
    const onLoginSuccess = jest.fn();

    const { getByTestId } = render(
      <LoginModal visible={true} onLoginSuccess={onLoginSuccess} />
    );

    fireEvent.changeText(getByTestId('username-input'), 'admin');
    fireEvent.changeText(getByTestId('password-input'), '1234');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({ username: 'admin' })
      );
      expect(onLoginSuccess).toHaveBeenCalled();
    });
  });
});
