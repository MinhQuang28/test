import React, { FC } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity, View } from '../index';
import { Grey06 } from '../../../themes/colors';

interface Props {
  onClose: () => void;
  opacity?: number | Animated.AnimatedValue | Animated.AnimatedInterpolation;
}
const AnimatedView = Animated.createAnimatedComponent(View);

const Backdrop: FC<Props> = ({ onClose, opacity = 0.7 }) => {
  return (
    <TouchableOpacity
      style={[StyleSheet.absoluteFill]}
      onPress={onClose}
      activeOpacity={1}
    >
      <AnimatedView
        flexGrow
        style={{
          backgroundColor: Grey06,
          opacity,
        }}
      />
    </TouchableOpacity>
  );
};

export default Backdrop;
