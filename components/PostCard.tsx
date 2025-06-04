import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Post } from '@/schemas';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { Card, Description, Header, PostImage, TextContainer, Title } from '@/styled/postCard';

type Props = {
  post: Post;
};

const TEXT_MAX_LENGHT: number = 200;

const PostCard: React.FC<Props> = React.memo(({ post }: Props) => {
  const router = useRouter();

  const { removeFavorite, addFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(post.id);

  const handlePress = useCallback(() => {
    router.push({
      pathname: '/post/[id]',
      params: { id: post.id.toString() },
    });
  }, [router, post.id]);

  const toggleFavorite = useCallback(async () => {
    if (isFav) {
      await removeFavorite(post.id);
    } else {
      await addFavorite(post);
    }
  }, [post.id, addFavorite, removeFavorite]);

  return (
    <Card onPress={handlePress}>
      <PostImage
        source={{ uri: 'https://picsum.photos/200' }}
        testID="photo-image"
      />
      <TextContainer>
        <Header>
          <Title>{capitalizeFirstLetter(post.title)}</Title>
          <TouchableOpacity onPress={toggleFavorite}>
            <FontAwesome
              name={isFav ? 'heart' : 'heart-o'}
              size={20}
              color={isFav ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </Header>
        <Description>
          {capitalizeFirstLetter(post.body).slice(0, TEXT_MAX_LENGHT)} 
          {post.body.length > TEXT_MAX_LENGHT ? '...' : ''}
        </Description>
      </TextContainer>
    </Card>
  );
});

export default PostCard;
