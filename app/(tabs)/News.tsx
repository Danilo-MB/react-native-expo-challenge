import { View, Text, ActivityIndicator, FlatList, StyleSheet, ListRenderItem, TextInput } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Post } from '../../schemas';
import { JSX, useCallback, useMemo, useState } from 'react';
import PostCard from '../../components/PostCard';
import { fetchPosts } from '@/services/posts';


export default function PhotosScreen(): JSX.Element {
  
  const { data: posts, isLoading, error } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    const query = searchQuery.toLowerCase();
  
    return posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);


  const renderItem = useCallback<ListRenderItem<Post>>(
    ({ item }) => <PostCard post={item} />,
    []
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading photos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load photos.</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder='Search by title...'
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={(item: Post) => item.id.toString()}
        contentContainerStyle={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});