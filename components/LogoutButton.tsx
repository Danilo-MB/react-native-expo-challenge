import React from 'react';
import { Alert, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
  onLogoutPress: () => void;
};

const LogoutButton: React.FC<Props> = ({ onLogoutPress }) => {
  const { t } = useTranslation();

  return (
    <Button
      title={t('logout')}
      onPress={() => {
        Alert.alert(t('logout'), t('confirm_logout', 'Are you sure you want to log out?'), [
          { text: t('cancel'), style: 'cancel' },
          { text: t('logout'), style: 'destructive', onPress: onLogoutPress },
        ]);
      }}
    />
  );
};

export default LogoutButton;
