import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useTranslation } from 'react-i18next';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='(posts)/index'
        options={{
          title: 'Posts',
          tabBarLabel: t('posts'),
          tabBarIcon: ({ color }) => <TabBarIcon name='newspaper-o' color={color} />,
        }}
      />
      <Tabs.Screen
        name='(users)/index'
        options={{
          title: 'Users',
          tabBarLabel: t('users'),
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
      <Tabs.Screen
        name='(favorites)/index'
        options={{
          title: 'Favorites',
          tabBarLabel: t('favorites'),
          tabBarIcon: ({ color }) => <TabBarIcon name='heart' color={color} />,
        }}
      />
    </Tabs>
  );
}
