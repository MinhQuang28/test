import React, { cloneElement, FC } from 'react';
import { TabBar as DefaultTabBar, Route } from 'react-native-tab-view';
import { Props as TabBarProps } from 'react-native-tab-view/src/TabBar';
import { StyleSheet, Text } from 'react-native';
import { Scene } from 'react-native-tab-view/lib/typescript/src/types';
import { Grey03, Primary, Transparent } from '../../../themes/colors';
import { Regular } from '../../../themes/fonts';
import { normalizeFontSize } from '../../../utils/style.util';
import { View } from '../index';

const TabSpacing = 13;

const styles = StyleSheet.create({
  tab: {
    flexShrink: 1,
    padding: 0,
    margin: 0,
    flex: 0,
    width: 'auto',
    minHeight: 30,
    paddingHorizontal: TabSpacing,
  },
  container: {
    backgroundColor: Transparent,
    marginHorizontal: -TabSpacing,
    padding: 0,
  },
  tabLabel: {
    color: 'white',
    fontSize: normalizeFontSize(16),
    fontFamily: Regular,
    fontWeight: '500',
  },
  labelColor: { color: Grey03, fontFamily: Regular },
  labelFocus: { color: Primary },
  indicatorStyle: {
    backgroundColor: Transparent,
    padding: 0,
    margin: 0,
    height: 0,
  },
  labelStyle: { margin: 0, padding: 0 },
});

type Props = Omit<
  TabBarProps<Route>,
  | 'getLabelText'
  | 'getAccessible'
  | 'getAccessibilityLabel'
  | 'getTestID'
  | 'renderIndicator'
>;

const TabBar: FC<Props> = (props) => {
  const activeRouteKey =
    props?.navigationState?.routes[props.navigationState.index].key;
  return (
    <DefaultTabBar
      {...props}
      renderLabel={(scene: Scene<any>) => {
        const focused = activeRouteKey === scene.route.key;
        return (
          <View flexRow center>
            {scene.route.params?.icon &&
              cloneElement(scene.route.params?.icon, {
                style: { tintColor: focused ? Primary : Grey03 },
              })}
            {}
            <Text
              style={[
                styles.tabLabel,
                props.labelStyle,
                styles.labelColor,
                focused && styles.labelFocus,
              ]}
            >
              {scene.route.title}
            </Text>
          </View>
        );
      }}
      indicatorStyle={[styles.indicatorStyle, props.indicatorStyle]}
      labelStyle={[styles.labelStyle, props.labelStyle]}
      style={[styles.container, props.style]}
      tabStyle={[styles.tab, props.tabStyle]}
      activeColor={Primary}
      inactiveColor={'#000'}
    />
  );
};

export default TabBar;
