import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, FC} from 'react';
import {StatusBar, StatusBarProps} from 'react-native';

import {Primary} from '../../themes/colors';

interface Props extends StatusBarProps {}

const StatusbarCustom: FC<Props> = ({...other}) => {
  const isFocused = useIsFocused();
  return <StatusBar translucent={true} barStyle={'light-content'} {...other} />;
};

export default StatusbarCustom;
