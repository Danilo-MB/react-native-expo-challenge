import styled from 'styled-components/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';

export const Card = styled.View`
  padding-vertical: ${verticalScale(8)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gainsboro};
  border-style: solid;
`;

export const AuthorText = styled.Text`
  font-weight: 600;
  margin-bottom: ${verticalScale(4)}px;
`;

export const BodyText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${Colors.darkGray};
`;
