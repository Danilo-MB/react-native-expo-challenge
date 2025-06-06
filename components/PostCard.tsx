import React, { useCallback } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Post } from '@/schemas';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { Card, Description, Header, PostImage, TextContainer, Title } from '@/styled/postCard';
import { useTranslation } from 'react-i18next';
// TODO: Check why favorite status is not working at first app load (ios)

type Props = {
  post: Post;
};

const TEXT_MAX_LENGHT: number = 200;

const PostCard: React.FC<Props> = React.memo(({ post }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { removeFavorite, addFavorite, isFavorite } = useFavoritesStore();
  const isFav = useFavoritesStore(useCallback((state) => state.isFavorite(post.id), [post.id]));

  const handlePress = useCallback(() => {
    router.push({
      pathname: '/post/[id]',
      params: { id: post.id.toString() },
    });
  }, [router, post.id]);

  const toggleFavorite = useCallback(async () => {
    if (isFavorite(post.id)) {
      Alert.alert(t('remove_from_favorites'), t('confirm_remove'), [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('remove_from_favorites'),
          style: 'destructive',
          onPress: async () => {
            await removeFavorite(post.id);
          },
        },
      ]);
    } else {
      await addFavorite(post);
    }
  }, [post.id, isFavorite, addFavorite, removeFavorite, t]);

  return (
    <Card onPress={handlePress}>
      <PostImage source={{ uri: 'https://picsum.photos/200' }} testID="photo-image" />
      <TextContainer>
        <Header>
          <Title testID="post-title">{capitalizeFirstLetter(post.title)}</Title>
          <TouchableOpacity onPress={toggleFavorite} testID="favorite-button">
            <FontAwesome
              name={isFav ? 'heart' : 'heart-o'}
              size={20}
              color={isFav ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </Header>
        <Description testID="post-body">
          {capitalizeFirstLetter(post.body).slice(0, TEXT_MAX_LENGHT)}
          {post.body.length > TEXT_MAX_LENGHT ? '...' : ''}
        </Description>
      </TextContainer>
    </Card>
  );
});

export default PostCard;
