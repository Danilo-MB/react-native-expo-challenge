import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Post } from '../../schemas';
import { JSX, useCallback, useMemo, useState } from 'react';
import PostCard from '../../components/PostCard';
import { fetchPosts } from '@/services/posts';
import { Centered, ErrorText, Message, SearchInput } from '@/styled/posts';
import { verticalScale, moderateScale } from 'react-native-size-matters';

export default function PostsScreen(): JSX.Element {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    const query = searchQuery.toLowerCase();

    return posts.filter(
      (post) => post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query),
    );
  }, [posts, searchQuery]);

  const renderItem = useCallback<ListRenderItem<Post>>(({ item }) => <PostCard post={item} />, []);

  if (isLoading) {
    return (
      <Centered>
        <ActivityIndicator size='large' />
        <Message>Loading photos...</Message>
      </Centered>
    );
  }

  if (error) {
    return (
      <Centered>
        <ErrorText>Failed to load photos.</ErrorText>
        <Message>{error.message}</Message>
      </Centered>
    );
  }

  return (
    <>
      <SearchInput
        placeholder='Search by title...'
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={(item: Post) => item.id.toString()}
        contentContainerStyle={{
          paddingVertical: verticalScale(20),
          paddingHorizontal: moderateScale(16),
        }}
      />
    </>
  );
}