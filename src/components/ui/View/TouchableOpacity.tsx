import {ComponentType} from 'react';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Spacing} from '../Common/Spacing';
import {Flex, Position} from '../Common/Position';
import {withAllStyleUtils} from '../../../hoc/style';

const TouchableOpacity: ComponentType<
  TouchableOpacityProps & Spacing & Flex & Position
> = withAllStyleUtils(RNTouchableOpacity);
export default TouchableOpacity;
