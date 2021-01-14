import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { debounce } from 'lodash';
import { ScreenHeight } from '../../../themes/size';

export interface Tab {
  key: string;
  title: string;
  scene: ReactNode;
}

interface Props extends Pick<FlatListProps<Tab>, 'refreshing' | 'onRefresh'> {
  tabs: Tab[];
  activeIndex: number;
  onChangeActiveTab: (index: number) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  renderFooter?: (props: any) => ReactElement;
}

interface ScrollContentHandler {
  scrollToIndex: (i: number) => void;
}

interface ContentOffset {
  [key: string]: {
    maxOffset: number;
    offset: number;
  };
}

interface ItemLayoutInfo {
  key: string;
  maxOffset: number;
  height: number;
  offset: number;
}

const ScrollContent = forwardRef<ScrollContentHandler, Props>(
  (
    {
      tabs,
      activeIndex,
      onChangeActiveTab,
      contentContainerStyle,
      onRefresh,
      refreshing,
      renderFooter,
      ...other
    },
    ref,
  ) => {
    const tabContentHeight = useRef<Array<number>>([]);
    const setManualScrollTimeout = useRef<NodeJS.Timeout>();
    const [canManuallyScrolling, setCanManuallyScrolling] = useState(true);
    const scrollViewRef = useRef<FlatList>(null);
    const [tabContentHeightState, setTabContentHeightState] = useState<{
      [key: string]: any;
    }>([]);
    const tabContentOffset = useMemo<ContentOffset>(() => {
      const listItemLayoutInfo = tabContentHeightState.reduce(
        (acc: Array<ItemLayoutInfo>, height: number, index: number) => {
          const { key } = tabs[index];
          let offset = 0;
          const lastItem = acc.length >= 1 ? acc[acc.length - 1] : undefined;
          if (lastItem) {
            offset = lastItem.maxOffset;
          }
          return [
            ...acc,
            {
              key,
              maxOffset: offset + height,
              height,
              offset,
            },
          ];
        },
        [],
      );
      return listItemLayoutInfo.reduce((acc: ContentOffset, item: any) => {
        return {
          ...acc,
          [item.key]: {
            maxOffset: item.maxOffset,
            offset: item.offset,
          },
        };
      }, {});
    }, [tabContentHeightState, tabs]);
    const handleScroll = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (canManuallyScrolling) {
          // Only calculate when it's manually scroll by user (not when tap on tabbar)
          const index = tabs.findIndex((i) => {
            return (
              tabContentOffset[i.key]?.maxOffset > e.nativeEvent.contentOffset.y
            );
          });
          if (activeIndex !== index) {
            onChangeActiveTab(index);
          }
        }
      },
      [
        activeIndex,
        canManuallyScrolling,
        onChangeActiveTab,
        tabContentOffset,
        tabs,
      ],
    );
    const handleMomentumScrollEnd = useCallback(() => {
      if (!canManuallyScrolling) {
        setCanManuallyScrolling(true);
        // @ts-ignore
        clearTimeout(setManualScrollTimeout.current);
      }
    }, [canManuallyScrolling]);

    useImperativeHandle(ref, () => ({
      scrollToIndex: (index: number) => {
        setCanManuallyScrolling(false);
        clearTimeout(Number(setManualScrollTimeout?.current));
        setManualScrollTimeout.current = setTimeout(() => {
          setCanManuallyScrolling(true);
        }, 400);
        // user cannot manually scroll when use tap on tabbar and will able to scroll when momentum scroll end or after 400ms
        scrollViewRef?.current?.scrollToIndex({
          index: index,
        });
      },
    }));
    const debounceSetState = useMemo(
      () => debounce(setTabContentHeightState, 50),
      [],
    );
    const renderItem = ({ item, index }: ListRenderItemInfo<Tab>) => {
      return (
        <View
          onLayout={(e) => {
            if (
              tabContentHeight.current[index] &&
              tabContentHeight.current[index] === e.nativeEvent.layout.height
            ) {
              return;
            }
            tabContentHeight.current[index] = e.nativeEvent.layout.height;
            if (
              tabs.every((_, tabIndex) => {
                return typeof tabContentHeight.current[tabIndex] === 'number';
              })
            ) {
              debounceSetState([...tabContentHeight.current]);
            }
          }}
        >
          {item.scene}
        </View>
      );
    };
    const renderListFooter = useCallback(() => {
      if (renderFooter) {
        const props = {
          tabContentHeight: tabContentHeight.current[tabs.length - 1] || 0,
        };
        return <View>{renderFooter(props)}</View>;
      }
      return <></>;
    }, [renderFooter, tabContentHeight.current]);
    const keyExtractor = (i: Tab) => i.key;

    return (
      <FlatList
        ref={scrollViewRef}
        data={tabs}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEnabled={canManuallyScrolling}
        contentContainerStyle={contentContainerStyle}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListFooterComponent={renderListFooter()}
        // ListFooterComponent={() => <View style={{ height: ScreenHeight }} />}
      />
    );
  },
);

export default ScrollContent;
