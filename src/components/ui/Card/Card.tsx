import React, {FC} from 'react';
import {ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {White} from '../../../themes/colors';
import {withPosition, withSpacing} from '../../../hoc/style';

const CardContainer = styled.View`
  background-color: ${White};
  padding: 12px 16px;
  border-radius: 8px;
  padding-top: 14px;
`;

const Card: FC<ViewProps> = ({children, ...other}) => {
  return <CardContainer {...other}>{children}</CardContainer>;
};

export default withPosition(withSpacing(Card));
