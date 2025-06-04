import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';


export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${moderateScale(16)}px;
`;

export const ErrorText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${Colors.red};
`;

export const LoadingText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${Colors.darkGray};
`;
