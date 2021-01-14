import { ComponentType } from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { Spacing } from '../Common/Spacing';
import { TextAlignment } from '../Common/Text';
import { withSpacing, withTextAlignment } from '../../../hoc/style';

const Text: ComponentType<
  TextProps & Spacing & TextAlignment
> = withTextAlignment(withSpacing(RNText));
export default Text;
