import { useLocalSearchParams, useNavigation } from 'expo-router';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/services/posts';
import { fetchCommentsByPostId } from '@/services/comments';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { PostComment } from '@/schemas';
import { CommentCard } from '@/components/CommentCard';
import { useCallback, useLayoutEffect, useState } from 'react';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = Number(id);
  const navigation = useNavigation();
  const [showFullBody, setShowFullBody] = useState<boolean>(false);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
    enabled: !!id,
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
    enabled: !!id,
  });

  useLayoutEffect(() => {
    if (id) {
      navigation.setOptions({
        title: `Post #${id}`,
        headerBackTitle: 'Back',
      });
    }
  }, [navigation, id]);

  const renderCommentItem = useCallback(
    ({ item }: { item: PostComment }) => <CommentCard comment={item} />,
    [],
  );

  const toggleShowBody = () => setShowFullBody((prev) => !prev);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading post...</Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load post.</Text>
      </View>
    );
  }

  const displayBody = showFullBody
    ? capitalizeFirstLetter(post.body)
    : capitalizeFirstLetter(post.body.slice(0, 100)) + (post.body.length > 100 ? '...' : '');
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
        <Text style={styles.title}>{capitalizeFirstLetter(post.title)}</Text>
        <Text style={styles.body}>{displayBody}</Text>
        {post.body.length > 100 && (
          <Pressable onPress={toggleShowBody}>
            <Text style={styles.readMore}>{showFullBody ? 'Read less' : 'Read more'}</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.commentHeader}>Comments</Text>
      {commentsLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCommentItem}
          style={{ height: '40%' }}
        />
      )}
    </View>
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
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    marginBottom: 8,
  },
  readMore: {
    color: 'blue',
    marginBottom: 16,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
