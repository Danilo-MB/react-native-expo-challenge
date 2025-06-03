import { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Post } from '@/schemas';
import PostCard from '@/components/PostCard';
import { useFocusEffect } from 'expo-router';
import { useFavoritesStore } from '@/stores/favoritesStore';


export default function FavoritesScreen() {
  const { favorites, loadFavorites } = useFavoritesStore();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const renderItem = useCallback(
    ({ item }: { item: Post }) => <PostCard post={item} />,
    []
  );

  if (!favorites.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No favorite posts yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
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
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});