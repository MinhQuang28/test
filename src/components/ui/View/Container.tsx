import React, {ComponentProps, FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View} from '../index';
import {getStatusBar} from '../../../utils/style.util';
import {useKeyboard} from '../../../hooks/useKeyboard';
import {withSpacing} from '../../../hoc/style';

const AppContainer: FC<ComponentProps<typeof View>> = ({
  children,
  style,
  ...other
}) => {
  const {bottom} = useSafeAreaInsets();
  const isKeyboardShow = useKeyboard();
  const tabBarHeight = !isKeyboardShow ? 90 : 0; // tab bar will hide when keyboard shown
  const paddingBottom = Math.max(bottom - 4, 0) + tabBarHeight;
  return (
    <View
      flexGrow
      style={[{paddingTop: 58 + getStatusBar(), paddingBottom}, style]}
      {...other}>
      {children}
    </View>
  );
};

export default withSpacing(AppContainer);
