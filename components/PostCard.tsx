import React, { useCallback } from 'react';
import { View, Text, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Post } from '@/schemas';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { useFavoritesStore } from '@/stores/favoritesStore';

type Props = {
  post: Post;
};

const PostCard = React.memo(({ post }: Props) => {
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
  }, [isFav, post, addFavorite, removeFavorite]);

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={styles.image}
        testID="photo-image"
      />
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{capitalizeFirstLetter(post.title)}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <FontAwesome
              name={isFav ? 'heart' : 'heart-o'}
              size={20}
              color={isFav ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{capitalizeFirstLetter(post.body)}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontWeight: '300',
  },
});

export default PostCard;
