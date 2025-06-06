import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';

export const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${scale(20)}px;
`;

export const Container = styled.View`
  padding-horizontal: ${scale(16)}px;
  padding-top: ${scale(10)}px;
  padding-bottom: ${scale(130)}px;
`;

export const StyledImage = styled.Image`
  width: 100%;
  height: ${scale(200)}px;
  border-radius: ${scale(8)}px;
  margin-bottom: ${scale(16)}px;
`;

export const Title = styled.Text`
  font-size: ${scale(16)}px;
  font-weight: bold;
  margin-bottom: ${scale(8)}px;
`;

export const Body = styled.Text`
  margin-bottom: ${scale(8)}px;
`;

export const ReadMore = styled.Text`
  color: ${Colors.linksBlue};
  margin-bottom: ${scale(16)}px;
`;

export const CommentHeader = styled.Text`
  font-size: ${scale(18)}px;
  font-weight: bold;
  margin-top: ${scale(24)}px;
  margin-bottom: ${scale(8)}px;
`;

export const ErrorText = styled.Text`
  font-size: ${scale(16)}px;
  color: ${Colors.red};
`;
