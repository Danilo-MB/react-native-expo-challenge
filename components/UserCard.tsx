import { User } from '../schemas';
import React from 'react';
import { Card, Email, Name, Phone, Website } from '@/styled/userCard';
import { Alert, Linking, TouchableOpacity } from 'react-native';

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = React.memo(({ user }: Props) => {
  
  const handlePress = async (): Promise<void> => {
    const supported = await Linking.canOpenURL(user.website);
    if (supported) {
      await Linking.openURL(`https://${user.website}`);
    } else {
      Alert.alert('Oops!', 'This link is not supported on your device.');
    }
  };

  return (
    <Card>
      <Name>
        {user.name} (@{user.username})
      </Name>
      <Email>{user.email}</Email>
      <Phone>{user.phone}</Phone>
      <TouchableOpacity
        onPress={handlePress}
      >
        <Website>{user.website}</Website>
      </TouchableOpacity>
    </Card>
  );
});

export default UserCard;
