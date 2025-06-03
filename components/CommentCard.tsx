import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { PostComment } from '../schemas';

type Props = {
  comment: PostComment;
};

export const CommentCard = React.memo(({ comment }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.author}>
        By {comment.name} @ {comment.email}
      </Text>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  author: {
    fontWeight: '400',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#333',
  },
});
