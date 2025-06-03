// app/(tabs)/Users.tsx
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../services/users'
import { User } from '../../schemas';
import UserCard from '@/components/UserCard';
import { useCallback } from 'react';


export default function UsersScreen() {
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const renderItem = useCallback(
    ({ item }: { item: User }) => <UserCard user={item} />,
    []
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading users...</Text>
      </View>
    );
  }

  if (error || !users) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load users.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});