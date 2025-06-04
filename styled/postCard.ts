import styled from 'styled-components/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export const Card = styled.Pressable`
  margin-bottom: ${verticalScale(20)}px;
  padding: ${moderateScale(12)}px;
  background-color: #f2f2f2;
  border-radius: ${moderateScale(8)}px;
`;

export const PostImage = styled.Image`
  width: 100%;
  height: ${verticalScale(150)}px;
  margin-bottom: ${verticalScale(10)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const TextContainer = styled.View`
  flex-direction: column;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(4)}px;
`;

export const Title = styled.Text`
  font-weight: bold;
  flex: 1;
  margin-right: ${moderateScale(8)}px;
`;

export const Description = styled.Text`
  font-weight: 300;
`;