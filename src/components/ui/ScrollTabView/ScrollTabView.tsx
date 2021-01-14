import React, { FC, ReactElement, useCallback, useRef, useState } from 'react';
import { FlatListProps, StyleProp, ViewProps, ViewStyle } from 'react-native';
import { View } from '../index';
import ScrollTabBar from './ScrollTabBar';
import ScrollContent, { Tab } from './ScrollContent';

interface Props
  extends ViewProps,
    Pick<FlatListProps<Tab>, 'refreshing' | 'refreshControl' | 'onRefresh'> {
  tabs: Tab[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  renderFooter?: (props: any) => ReactElement;
}

const ScrollTabView: FC<Props> = ({
  tabs,
  contentContainerStyle,
  onRefresh,
  refreshing,
  renderFooter,
  ...other
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContentRef = useRef<React.ElementRef<typeof ScrollContent>>(null);
  const onChangeActiveTabTabBar = useCallback((i: number) => {
    setActiveTab(i);

    scrollContentRef?.current?.scrollToIndex(i);
  }, []);
  return (
    <View {...other}>
      <ScrollTabBar
        tabs={tabs}
        activeIndex={activeTab}
        onChangeActiveTab={onChangeActiveTabTabBar}
      />
      <ScrollContent
        ref={scrollContentRef}
        tabs={tabs}
        activeIndex={activeTab}
        onChangeActiveTab={setActiveTab}
        contentContainerStyle={contentContainerStyle}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderFooter={renderFooter}
      />
    </View>
  );
};

export default ScrollTabView;
