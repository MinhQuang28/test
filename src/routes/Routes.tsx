import React, {FC} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {NavigationState} from '@react-navigation/native';
import {Black, White} from '../themes/colors';
import {HeaderHeight} from '../themes/size';
import BackButton from '../components/ui/Navigation/BackButton';
import Quiz from '../screens/quiz-game/App';

const Stack = createStackNavigator();

export const BOTTOM_TAB_KEY = {
  HOME: 'Home',
  DOCTORS: 'Doctor',
  CALENDAR: 'Calendar',
  PHR: 'PHR',
  PROFILE: 'Profile',
};

export const BOTTOM_TAB_NAME = {
  HOME: 'Trang chủ',
  DOCTORS: 'Tìm bác sỹ',
  CALENDAR: 'Lịch khám',
  PHR: 'Hồ sơ',
  PROFILE: 'Cá nhân',
};
export const SCREEN_TITLE = {
  HOME: 'Trang chủ',
  DOCTORS: 'Tìm bác sỹ',
  CALENDAR: 'Lịch khám',
  PHR: 'Hồ sơ',
  PROFILE: 'Thông tin cá nhân',
};

const headerConfig: StackNavigationOptions = {
  cardShadowEnabled: false,

  headerStyle: {
    backgroundColor: Black,
    shadowColor: 'transparent',
    elevation: 0,
    height: HeaderHeight,
  },
  headerTintColor: White,
  headerTitleAlign: 'center',
  headerTitleStyle: {},
};

export const getActiveRouteName: any = (state: NavigationState) => {
  const nextRoute = state.routes;
  if (nextRoute && nextRoute[state.index]?.state) {
    return getActiveRouteName(nextRoute[state.index].state as NavigationState);
  }
  return state.routes[state.index].name;
};

const Routes: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: (p) => <BackButton {...p} />,
      }}>
      <Stack.Screen
        options={{
          ...headerConfig,
          headerTitle: 'Quiz',
        }}
        name={'Quiz'}
        component={Quiz}
      />
      {/* <Stack.Screen
            options={{
              ...headerConfig,
              headerTitle: () => null,
              headerLeft: () => <LoginLogo />,
              headerRight: () => <StepText step={1} />,
            }}
            name={'Login_StepOne'}
            component={StepOne}
          />

          <Stack.Screen
            options={{
              ...headerConfig,
              headerTitle: 'Mật khẩu',
              headerRight: () => <StepText step={2} />,
            }}
            name={'Login_StepTwo'}
            component={StepTwo}
          />

          <Stack.Screen
            options={{
              ...headerConfig,
              headerTitle: 'Quên mật khẩu',
              headerRight: () => <StepText step={1} />,
            }}
            name={'ForgotPassword'}
            component={ForgotPassword}
          />

          <Stack.Screen
            options={{
              ...headerConfig,
              headerTitle: 'Tạo tài khoản',
            }}
            name={'Register_StepOne'}
            component={RegisterStepOne}
          />
          <Stack.Screen
            options={{
              ...headerConfig,
              headerTitle: 'Tạo tài khoản',
            }}
            name={'Register_StepTwo'}
            component={RegisterStepTwo}
          />
          <Stack.Screen
            options={{
              ...headerConfig,
              headerLeft: () => null,
            }}
            name={'Common_Success'}
            component={Success}
          /> */}
    </Stack.Navigator>
  );
};

export default Routes;
