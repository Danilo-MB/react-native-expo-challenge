import { useLocalSearchParams, useNavigation } from 'expo-router';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/services/posts';
import { fetchCommentsByPostId } from '@/services/comments';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { PostComment } from '@/schemas';
import CommentCard from '@/components/CommentCard';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Body, Centered, CommentHeader, Container, ErrorText, ReadMore, StyledImage, Title } from '@/styled/post';

const PostDetailScreen: React.FC = () => {
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
      <Centered>
        <ActivityIndicator size='large' />
        <Text>Loading post...</Text>
      </Centered>
    );
  }

  if (error || !post) {
    return (
      <Centered>
        <ErrorText>Failed to load post.</ErrorText>
      </Centered>
    );
  }

  const displayBody = showFullBody
    ? capitalizeFirstLetter(post.body)
    : capitalizeFirstLetter(post.body.slice(0, 100)) + (post.body.length > 100 ? '...' : '')
  ;

  return (
    <Container>
      <View>
        <StyledImage source={{ uri: 'https://picsum.photos/200' }} />
        <Title>{capitalizeFirstLetter(post.title)}</Title>
        <Body>{displayBody}</Body>
        {post.body.length > 100 && (
          <Pressable onPress={toggleShowBody}>
            <ReadMore>{showFullBody ? 'Read less' : 'Read more'}</ReadMore>
          </Pressable>
        )}
      </View>

      <CommentHeader>Comments</CommentHeader>
      {commentsLoading ? (
        <ActivityIndicator size='small' />
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCommentItem}
          style={{ height: '40%' }}
        />
      )}
    </Container>
  );
}

export default PostDetailScreen;