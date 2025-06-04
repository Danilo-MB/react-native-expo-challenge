import styled from 'styled-components/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${moderateScale(20)}px;
`;

export const Title = styled.Text`
  font-size: ${moderateScale(20)}px;
  font-weight: bold;
`;

export const Link = styled.TouchableOpacity`
  margin-top: ${verticalScale(15)}px;
  padding-vertical: ${verticalScale(15)}px;
`;

export const LinkText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${Colors.linksBlue};
`;
