import { Stack, useRouter } from 'expo-router';
import { Container, Link, LinkText, Title } from '@/styled/notFound';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Title>This screen doesn't exist.</Title>

        <Link onPress={() => router.replace('/(tabs)/(posts)')}>
          <LinkText>Go to home screen!</LinkText>
        </Link>
      </Container>
    </>
  );
}
