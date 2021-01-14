import { Dimensions } from 'react-native';

import { getStatusBar } from '../utils/style.util';

export const StatusBarHeight = getStatusBar();

export const Heading1FontSize = 40;
export const Heading2FontSize = 32;
export const Heading3FontSize = 24;
export const Heading4FontSize = 16;
export const Heading5FontSize = 8;

export const FormControlHeight = {
  normal: 54,
};

export const ScreenHeight = Dimensions.get('screen').height;
export const ScreenWidth = Dimensions.get('screen').width;
export const WindowHeight = Dimensions.get('window').height;
export const WindowWidth = Dimensions.get('window').width;

export const HeaderHeight = 50;
