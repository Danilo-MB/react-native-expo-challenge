import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import PostCard from '../PostCard';
import { useRouter } from 'expo-router';
import { FavoritesState } from '@/stores/favoritesStore';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

const mockIsFavorite = jest.fn();
const mockAddFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();

jest.mock('@/stores/favoritesStore', () => ({
  useFavoritesStore: (selector?: (state: FavoritesState) => unknown) => {
    if (selector) {
      return selector({
        favorites: [],
        loadFavorites: jest.fn(),
        addFavorite: mockAddFavorite,
        removeFavorite: mockRemoveFavorite,
        isFavorite: mockIsFavorite,
      });
    }
    return {
      favorites: [],
      loadFavorites: jest.fn(),
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      isFavorite: mockIsFavorite,
    };
  },
}));

jest.mock('@expo/vector-icons', () => ({
  FontAwesome: 'FontAwesome',
}));

describe('PostCard', () => {
  const mockPost = {
    id: 1,
    title: 'test title',
    body: 'test body that is longer than 200 characters '.repeat(10),
    userId: 1,
  };

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders correctly with all elements', () => {
    const { getByTestId } = render(<PostCard post={mockPost} />);

    expect(getByTestId('photo-image')).toBeTruthy();
    expect(getByTestId('post-title')).toBeTruthy();
    expect(getByTestId('post-body')).toBeTruthy();
    expect(getByTestId('favorite-button')).toBeTruthy();
  });

  it('displays the post title and truncated body', () => {
    const { getByTestId } = render(<PostCard post={mockPost} />);

    const title = getByTestId('post-title');
    const body = getByTestId('post-body');

    expect(title.props.children).toBe('Test title');
    expect(body.props.children[0].length).toBeLessThanOrEqual(200);
    expect(body.props.children[1]).toBe('...');
  });

  it('navigates to post detail when pressed', () => {
    const { getByTestId } = render(<PostCard post={mockPost} />);

    act(() => {
      fireEvent.press(getByTestId('photo-image').parent);
    });

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/post/[id]',
      params: { id: '1' },
    });
  });

  //TODO: Fix this test
  // it('toggles favorite status when favorite button is pressed', async () => {
  //   mockIsFavorite.mockReturnValue(false);
  //   const { getByTestId } = render(<PostCard post={mockPost} />);

  //   await act(async () => {
  //     fireEvent.press(getByTestId('favorite-button'));
  //   });
  //   expect(mockAddFavorite).toHaveBeenCalledWith(mockPost);

  //   mockIsFavorite.mockReturnValue(true);
  //   const { getByTestId: getByTestId2 } = render(<PostCard post={mockPost} />);

  //   await act(async () => {
  //     fireEvent.press(getByTestId2('favorite-button'));
  //   });
  //   expect(mockRemoveFavorite).toHaveBeenCalledWith(mockPost.id);
  // });

  it('displays correct favorite icon based on favorite status', () => {
    mockIsFavorite.mockReturnValue(false);
    const { getByTestId: getByTestId1 } = render(<PostCard post={mockPost} />);
    const icon1 = getByTestId1('favorite-button').children[0];
    expect(icon1.props.name).toBe('heart-o');

    mockIsFavorite.mockReturnValue(true);
    const { getByTestId: getByTestId2 } = render(<PostCard post={mockPost} />);
    const icon2 = getByTestId2('favorite-button').children[0];
    expect(icon2.props.name).toBe('heart');
  });
});
