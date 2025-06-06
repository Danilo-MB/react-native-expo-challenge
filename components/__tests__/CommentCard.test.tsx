import React from 'react';
import { render } from '@testing-library/react-native';
import CommentCard from '../CommentCard';
import { PostComment } from '@/schemas';

const mockComment: PostComment = {
  postId: 1,
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  body: 'This is a test comment.',
};

describe('CommentCard', () => {
  it('renders the comment card with correct author and body using testIDs', () => {
    const { getByTestId } = render(<CommentCard comment={mockComment} />);

    const card = getByTestId('comment-card');
    const author = getByTestId('comment-author');
    const body = getByTestId('comment-body');

    expect(card).toBeTruthy();
    expect(author.props.children.join('')).toContain('John Doe');
    expect(body.props.children).toBe('This is a test comment.');
  });
});
