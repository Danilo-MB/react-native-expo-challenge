import React, { useState } from 'react';
import { Modal, Button, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/stores/authStore';
import { z } from 'zod';
import { Container, ErrorText, Input, LoginHeader, MainContainer } from '@/styled/loginModal';

const DUMMY_CREDENTIALS = {
  username: 'admin',
  password: '1234',
};

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(4, 'Min 4 characters'),
});

type FormValues = z.infer<typeof loginSchema>;
type LoginModalProps = {
  visible: boolean;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { login } = useAuthStore();
  const { visible, onLoginSuccess} = props;
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (
    values: FormValues,
    { setErrors }: { setErrors: (errors: Partial<Record<keyof FormValues, string>>) => void }
  ) => {
    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    const { username, password } = values;

    if (
      username === DUMMY_CREDENTIALS.username &&
      password === DUMMY_CREDENTIALS.password
    ) {
      await AsyncStorage.setItem('user', JSON.stringify({ username }));
      login(username);
      // TODO: Wrap this in a settimeout could simulate a delayed server response
      setLoading(true);
      onLoginSuccess();
      setLoading(false);

    } else {
      setErrors({ password: 'Invalid credentials' });
    }
  };

  return (
    <Modal 
      visible={visible}
      transparent
    >
      <MainContainer>
        <Container>
          <LoginHeader>Please Log In</LoginHeader>
          <Formik<FormValues>
            initialValues={{ username: '', password: '' }}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <Input
                  placeholder='Username'
                  value={values.username}
                  onChangeText={handleChange('username')}
                  testID='username-input'
                  autoCapitalize='none'
                />
                {touched.username && errors.username && (
                  <ErrorText testID='username-error'>{errors.username}</ErrorText>
                )}

                <Input
                  placeholder='Password'
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                  testID='password-input'
                />
                {touched.password && errors.password && (
                  <ErrorText testID='password-error'>{errors.password}</ErrorText>
                )}
                {loading ?
                  <ActivityIndicator />
                  :
                  <Button 
                    title={'Log In'}
                    // TODO: Fix TS issue here:
                    onPress={handleSubmit as any} 
                    testID='login-button' 
                    disabled={loading}
                  />
                }
              </>
            )}
          </Formik>
        </Container>
      </MainContainer>
    </Modal>
  );
};

export default LoginModal;