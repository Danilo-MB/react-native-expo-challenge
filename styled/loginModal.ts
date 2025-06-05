import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';


export const MainContainer = styled.View`
  flex: 1;
  background-color: ${Colors.transparentBlack};
  justify-content: center;
`;

export const Container = styled.View`
  justify-content: center;
  padding: ${moderateScale(20)}px;
  margin: ${moderateScale(20)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${Colors.white};
`;

export const Input = styled.TextInput`
  border: ${Colors.gray};
  padding: ${moderateScale(10)}px;
  border-radius: 5px;
  margin-bottom: ${moderateScale(12)}px;
`;

export const LoginHeader = styled.Text`
  color: ${Colors.darkGray};
  margin-bottom: ${moderateScale(10)}px;
  font-size: ${moderateScale(20)}px;
  text-align: center;
  margin-bottom: ${moderateScale(30)}px;

`;

export const ErrorText = styled.Text`
  color: ${Colors.red};
  margin-bottom: ${moderateScale(10)}px;
`;