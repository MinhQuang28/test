import React from 'react';
import {Image} from '../../ui';
// import images from '../../../assets/images/images';
import styled from 'styled-components/native';

const ViewWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-content: center;
  margin-left: 10px;
`;

const LoginLogo = () => {
  return (
    <ViewWrapper>
      {/* <Image source={images.login.iconLogin} /> */}
    </ViewWrapper>
  );
};

export default LoginLogo;
