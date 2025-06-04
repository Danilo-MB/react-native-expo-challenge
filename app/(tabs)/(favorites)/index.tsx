import { JSX, useCallback } from 'react';
import { FlatList } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useFocusEffect } from 'expo-router';
import { Post } from '@/schemas';
import PostCard from '@/components/PostCard';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { CenteredView, EmptyText } from '@/styled/favorites';

export default function FavoritesScreen(): JSX.Element {
  const { favorites, loadFavorites } = useFavoritesStore();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  const renderItem = useCallback(({ item }: { item: Post }) => <PostCard post={item} />, []);

  if (!favorites.length) {
    return (
      <CenteredView>
        <EmptyText>No favorite posts yet.</EmptyText>
      </CenteredView>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{
        padding: moderateScale(16),
      }}
    />
  );
}
