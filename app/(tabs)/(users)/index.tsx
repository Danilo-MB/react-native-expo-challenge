import { FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../services/users';
import { User } from '../../../schemas';
import UserCard from '@/components/UserCard';
import { JSX, useCallback } from 'react';
import { CenteredContainer, ErrorText, LoadingText } from '@/styled/users';
import { scale } from 'react-native-size-matters';

export default function UsersScreen(): JSX.Element {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const renderItem = useCallback(({ item }: { item: User }) => <UserCard user={item} />, []);

  if (isLoading) {
    return (
      <CenteredContainer>
        <LoadingText>Loading users...</LoadingText>
      </CenteredContainer>
    );
  }

  if (error || !users) {
    return (
      <CenteredContainer>
        <ErrorText>Failed to load users.</ErrorText>
      </CenteredContainer>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: scale(16) }}
    />
  );
}
