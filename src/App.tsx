import 'react-native-gesture-handler';
import React, { FC, useCallback, useEffect } from 'react';

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { Provider } from 'react-redux';

import {
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {  store } from './store';
import Routes from './routes/Routes';
import navigation from './services/navigation.service';
// import { View } from './components/ui';
import { IOS } from './utils/platform.util';

const App: FC = () => {
  const token = store.getState()?.user;
  console.log(token);


  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />
      <Provider store={store}>

        








        
              <SafeAreaProvider>
                <NavigationContainer
                  ref={(ref: NavigationContainerRef) =>
                    navigation.setContainerNavigator(ref)
                  }
                >
                    <Routes />
                </NavigationContainer>
              </SafeAreaProvider>
      </Provider>
    </>
  );
};

export default App;
