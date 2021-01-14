import React, { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Image, View } from '../index';
import { Grey01, Grey04, Grey06, Transparent } from '../../../themes/colors';

interface Props {
  focused: boolean;
  source: ImageSourcePropType;
}

const TabIcon: FC<Props> = ({ source, focused }) => (
  <View
    style={{
      width: 56,
      height: 56,
      backgroundColor: focused ? Grey01 : Transparent,
      borderRadius: 8.5,
    }}
    center
  >
    <Image
      source={source}
      style={{ tintColor: focused ? Grey06 : Grey04, resizeMode: 'contain' }}
    />
  </View>
);

export default TabIcon;
