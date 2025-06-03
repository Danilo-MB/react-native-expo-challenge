import { render } from '@testing-library/react-native';
import { PostCard } from '../PostCard';
import { Photo } from '@/schemas';


const mockPhoto: Photo = {
  albumId: 1,
  id: 1,
  title: 'test photo',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952',
};

test('renders title and image', () => {
  const { getByText, getByTestId } = render(<PostCard photo={mockPhoto} />);
  expect(getByText('Test photo')).toBeTruthy();
  expect(getByTestId('photo-card-image')).toBeTruthy();
});

