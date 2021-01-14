import { ComponentType } from 'react';
import { View as RNView, ViewProps } from 'react-native';
import { Spacing } from '../Common/Spacing';
import { Flex, Position } from '../Common/Position';
import { withAllStyleUtils } from '../../../hoc/style';

const View: ComponentType<
  ViewProps & Spacing & Flex & Position
> = withAllStyleUtils(RNView);
export default View;
