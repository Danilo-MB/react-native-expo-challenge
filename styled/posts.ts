import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';
import { TextInput } from 'react-native';

export const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${moderateScale(20)}px;
`;

export const Message = styled.Text`
  font-size: ${moderateScale(16)}px;
  margin-top: ${verticalScale(10)}px;
  color: ${Colors.darkGray};
`;

export const ErrorText = styled(Message)`
  font-weight: bold;
  color: ${Colors.red};
`;

export const SearchInput = styled(TextInput)`
  background-color: ${Colors.white};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(8)}px;
  margin-bottom: ${verticalScale(16)}px;
  font-size: ${moderateScale(16)}px;
  margin-horizontal: ${scale(16)}px;
`;
