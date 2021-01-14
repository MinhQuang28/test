import {ComponentType} from 'react';
import {Image as RNImage, ImageProps} from 'react-native';
import {Spacing} from '../Common/Spacing';
import {withSpacing} from '../../../hoc/style';

const Image: ComponentType<ImageProps & Spacing> = withSpacing(RNImage);
export default Image;
