import { View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { Colors } from '../constants/Colors';

export const Container = styled(View)`
  flex-direction: row;
  padding-left: ${scale(12)}px;
`;

export const LangText = styled(Text)<{ selected: boolean }>`
  font-size: ${scale(14)}px;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  color: ${(props) => (props.selected ? Colors.linksBlue : Colors.gray)};
  margin-right: ${scale(4)}px;
`;

export const Separator = styled(Text)`
  font-size: ${scale(14)}px;
  color: ${Colors.gray};
  margin-right: ${scale(4)}px;
`;
