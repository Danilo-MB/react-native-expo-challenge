import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';

export const Card = styled.View`
  padding: ${moderateScale(12)}px;
  margin-bottom: ${moderateScale(16)}px;
  background-color: ${Colors.whiteSmoke};
  border-radius: ${moderateScale(8)}px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: ${moderateScale(16)}px;
  margin-bottom: ${moderateScale(4)}px;
`;

export const Email = styled.Text`
  color: ${Colors.darkGray};
  margin-bottom: ${moderateScale(2)}px;
`;

export const Phone = styled.Text`
  color: ${Colors.darkGray};
  margin-bottom: ${moderateScale(2)}px;
`;

export const Website = styled.Text`
  color: ${Colors.linksBlue};
`;
