import { User } from '../schemas';
import React from 'react';
import { Card, Email, Name, Phone, Website } from '@/styled/userCard';
import { Alert, Linking, TouchableOpacity } from 'react-native';

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = React.memo(({ user }: Props) => {
  const url = user.website.startsWith('http') ? user.website : `https://${user.website}`;
  
  return (
    <Card>
      <Name>
        {user.name} (@{user.username})
      </Name>
      <Email>{user.email}</Email>
      <Phone>{user.phone}</Phone>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'Unable to open the website.');
          });
        }}
      >
        <Website>{user.website}</Website>
      </TouchableOpacity>
    </Card>
  );
});

export default UserCard;
