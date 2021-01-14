import React from 'react';
import { Image, TouchableOpacity, View } from '../index';
import styled from 'styled-components/native';
import { White } from '../../../themes/colors';

const CameraWrapper = styled.View`
  background-color: ${White};
  position: absolute;
  bottom: 0;
  right: 0;
  align-content: center;
  justify-content: center;
  flex-direction: row;
  padding-top: 2px;
  width: 20px;
  height: 20px;
  border-radius: 1000px;
`;

const ImageStyled = styled.Image`
  width: 60px;
  height: 60px;
`;

const Avatar = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      {/* <ImageStyled source={images.Profile.iconAvatar} /> */}
      <CameraWrapper>
        {/* <Image source={images.common.iconCamera} /> */}
      </CameraWrapper>
    </TouchableOpacity>
  );
};

export default Avatar;
