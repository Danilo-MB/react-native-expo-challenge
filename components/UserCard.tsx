import { View, Text, StyleSheet } from 'react-native';
import { User } from '../schemas';
import React from 'react';

type Props = {
  user: User;
};

const UserCard = React.memo(({ user }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name} (@{user.username})</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.phone}>{user.phone}</Text>
      <Text style={styles.website}>{user.website}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    color: '#333',
    marginBottom: 2,
  },
  phone: {
    color: '#333',
    marginBottom: 2,
  },
  website: {
    color: '#007aff',
  },
});

export default UserCard;