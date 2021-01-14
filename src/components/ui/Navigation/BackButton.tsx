import React, { FC, useCallback } from 'react';
import { GestureResponderEvent, TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { Image, TouchableOpacity } from '../index';
import { White } from '../../../themes/colors';

interface Props extends TouchableOpacityProps {
  title?: string;
}

const TitleText = styled.Text`
  color: ${White};
  margin-left: 10px;
  font-size: 17px;
`;
const BackButton: FC<Props> = ({ title, onPress, ...other }) => {
  const navigation = useNavigation();
  const handleOnPress = useCallback((event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    } else {
      navigation.goBack();
    }
  }, []);

  return (
    <TouchableOpacity
      pa={2}
      flexRow={true}
      alignCenter={true}
      onPress={handleOnPress}
      {...other}
    >
      {/* <Image source={images.common.icBackWhite} /> */}
      <TitleText>{title || ''}</TitleText>
    </TouchableOpacity>
  );
};

export default BackButton;
