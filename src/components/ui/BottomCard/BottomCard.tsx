import React, {FC, forwardRef} from 'react';
import {Text, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {White} from '../../../themes/colors';
import {withFlex, withPosition, withSpacing} from '../../../hoc/style';

const BottomCardContainer = styled.View`
  background-color: ${White};
  position: absolute;
  bottom: 0;
  padding: 17px 32px;
  left: 0;
  right: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const BottomCard: FC<ViewProps> = forwardRef(({children, ...props}, ref) => {
  return (
    <BottomCardContainer {...props} ref={ref as any}>
      {children}
    </BottomCardContainer>
  );
});

export default withPosition(withFlex(withSpacing(BottomCard)));
