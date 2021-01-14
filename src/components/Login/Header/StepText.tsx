import React, { FC } from 'react';
import styled from 'styled-components/native';
import { White } from '../../../themes/colors';

interface Props {
  step: number;
}

const ViewWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-content: center;
  margin-right: 10px;
`;

const TextWrapper = styled.Text`
  color: ${White};
`;

const StepText: FC<Props> = ({ step }) => {
  return (
    <ViewWrapper>
      <TextWrapper>Bước {step} / 2</TextWrapper>
    </ViewWrapper>
  );
};

export default StepText;
