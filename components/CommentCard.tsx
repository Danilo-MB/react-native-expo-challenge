import React from 'react';
import { PostComment } from '../schemas';
import { AuthorText, BodyText, Card } from '@/styled/commentCard';

type Props = {
  comment: PostComment;
};

const CommentCard: React.FC<Props> = React.memo(({ comment }: Props) => {
  return (
    <Card testID="comment-card">
      <AuthorText testID="comment-author">
        By {comment.name} @ {comment.email}
      </AuthorText>
      <BodyText testID="comment-body">{comment.body}</BodyText>
    </Card>
  );
});

export default CommentCard;
