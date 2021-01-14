import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {
  Black,
  Branding_06,
  Branding_07,
  Primary,
} from '../../../themes/colors';
import { Bold, Regular } from '../../../themes/fonts';

interface Props extends ViewProps {
  tabs: { key: string; title: string }[];
  activeIndex: number;
  onChangeActiveTab: (index: number) => void;
}

const ScrollTabBar: FC<Props> = ({
  tabs,
  activeIndex,
  onChangeActiveTab,
  style,
  ...other
}) => {
  const tabItemWidth = useRef({});
  const scrollRef = useRef<ScrollView>(null);
  const scrollViewWidth = useRef(0);
  const currentScrollPosition = useRef(0);
  const [tabItemsWidthState, setTabItemsWidthState] = useState<{
    [key: string]: any;
  }>({});
  const [indicator, setIndicator] = useState({
    indicatorWidth: 0,
    indicatorTranslate: 0,
  });
  const animatedWidth = useRef(
    new Animated.Value(indicator.indicatorWidth || 0),
  ).current;
  const animatedTranslate = useRef(
    new Animated.Value(indicator.indicatorTranslate || 0),
  ).current;

  const scrollIfNeeded = useCallback(() => {
    const x =
      indicator.indicatorTranslate -
      (scrollViewWidth.current - indicator.indicatorWidth) / 2;
    scrollRef?.current?.scrollTo({ x });
  }, [indicator]);
  useEffect(() => {
    scrollIfNeeded();
  }, [scrollIfNeeded]);
  useEffect(() => {
    if (tabs[activeIndex]) {
      const { key } = tabs[activeIndex];
      const translate = tabs
        .slice(0, activeIndex)
        .reduce((acc, item) => acc + tabItemsWidthState[item.key] || 0, 0);
      setIndicator({
        indicatorWidth: Math.round(tabItemsWidthState[key]) || 0,
        indicatorTranslate: translate,
      });
    }
  }, [activeIndex, tabItemsWidthState, tabs]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedWidth, {
        toValue: indicator.indicatorWidth,
        useNativeDriver: false,
        duration: 150,
        easing: Easing.in(Easing.linear),
      }),
      Animated.timing(animatedTranslate, {
        toValue: indicator.indicatorTranslate,
        useNativeDriver: false,
        duration: 150,
        easing: Easing.in(Easing.linear),
      }),
    ]).start();
  }, [animatedTranslate, animatedWidth, indicator]);
  return (
    <Animated.View style={[scrollStyle.tab, style]}>
      <ScrollView
        style={{ height: 50 }}
        horizontal={true}
        ref={scrollRef}
        onLayout={(e) => {
          scrollViewWidth.current = e.nativeEvent.layout.width;
        }}
        onScroll={(e) => {
          currentScrollPosition.current = e.nativeEvent.contentOffset.x;
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {tabs.map((i, index) => (
          <TouchableOpacity
            key={i.key}
            onPress={() => onChangeActiveTab(index)}
          >
            <View
              onLayout={(e) => {
                // @ts-ignore
                tabItemWidth.current[i.key] = e.nativeEvent.layout.width;
                // @ts-ignore
                if (
                  tabs.every(
                    // @ts-ignore
                    ({ key }) => typeof tabItemWidth.current[key] === 'number',
                  )
                ) {
                  // only set state of tab width when all of measurement is complete
                  setTabItemsWidthState({ ...tabItemWidth.current });
                }
              }}
              style={scrollStyle.labelWrapper}
            >
              <Text
                style={[
                  {
                    color: activeIndex === index ? Branding_06 : Black,
                    fontFamily: activeIndex === index ? Bold : Regular,
                  },
                ]}
              >
                {i.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            scrollStyle.indicator,
            {
              width: animatedWidth,
              transform: [{ translateX: animatedTranslate }],
            },
          ]}
        />
      </ScrollView>
    </Animated.View>
  );
};

const scrollStyle = StyleSheet.create({
  tab: { height: 50 },
  label: {
    color: '#fff',
  },
  labelWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: 150,
    borderBottomColor: Branding_07,
    borderBottomWidth: 2,
  },
});

export default ScrollTabBar;
