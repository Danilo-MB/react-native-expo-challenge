import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from '@/components/useColorScheme';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/stores/authStore';
import LoginModal from '@/components/LoginModal';
import LogoutButtom from '@/components/LogoutButton';
import { useLanguageStore } from '../stores/languagesStore';
import LanguageToggleButton from '@/components/LanguageToggleButton';

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { logout, user } = useAuthStore();
  const colorScheme = useColorScheme();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  
  const loadSavedLanguage = async (): Promise<void> => {
    const savedLang = await AsyncStorage.getItem('language');
    if (savedLang === 'en' || savedLang === 'es') {
      useLanguageStore.getState().setLanguage(savedLang);
    }
  };

  const onLogoutPress = async (): Promise<void> => {
    logout();
    await AsyncStorage.removeItem('user');
  };

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      const user = await AsyncStorage.getItem('user');
    
      if (user) {
        useAuthStore.getState().login(JSON.parse(user).username);
        setShowLogin(false);
      } else {
        setShowLogin(true);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!user && !showLogin) {
      setShowLogin(true);
    }
  }, [user]);

  useEffect(() => {
    loadSavedLanguage();
  }, []);
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <>
          <Stack 
            screenOptions={{
              headerRight: () => (
                user ?
                  <LogoutButtom  onLogoutPress={onLogoutPress} />
                : null
              ),
              headerLeft: () => <LanguageToggleButton />,
            }}
          >
            <Stack.Screen 
              name='(tabs)'
              options={{ 
                headerShown: true,
                title: 'Posts App'
              }}
            />
          </Stack>
          <Toast />
          <LoginModal 
            visible={showLogin}
            onLoginSuccess={() => setShowLogin(false)}
          />
        </>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
