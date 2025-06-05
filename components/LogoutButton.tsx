import React from 'react';
import { Alert, Button } from 'react-native';

type Props = {
  onLogoutPress: () => void;
};

const LogoutButtom: React.FC<Props> = (props) => {
  const { onLogoutPress } = props;

  return (
    <Button
      title='Log out'
      onPress={() => {
        Alert.alert('Log out', 'Are you sure you want to log out?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Log Out', style: 'destructive', onPress: onLogoutPress },
        ]);
      }}
    /> 
  );
};

export default LogoutButtom;