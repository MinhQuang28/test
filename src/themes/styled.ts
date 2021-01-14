import styled from 'styled-components/native';
import {Text} from '../components/ui';
import {Red} from './colors';
import {normalizeFontSize} from '../utils/style.util';

export const ErrorText = styled(Text)`
  color: ${Red};
  font-size: ${normalizeFontSize(14)}px;
`;
