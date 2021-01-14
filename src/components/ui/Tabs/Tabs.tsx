import { Props as TabBarProps } from 'react-native-tab-view/src/TabBar';
import React, {
  ComponentType,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import {
  Route,
  SceneRendererProps,
} from 'react-native-tab-view/lib/typescript/src/types';
import { Dimensions } from 'react-native';
import TabBar from './TabBar';

interface Props {
  tabs: {
    key: string;
    title: string;
    icon?: ReactNode;
    scene?: ComponentType;
  }[];
  renderScene?: (
    props: SceneRendererProps & {
      route: Route;
    },
  ) => React.ReactNode;
  tabBarProps?: Partial<TabBarProps<Route>>;
  initialIndexTab: number;
  onTabChange: (tabIndex: number) => void;
}

const initialLayout = { width: Dimensions.get('window').width };

const Tabs: FC<Props> = ({
  tabs,
  renderScene,
  tabBarProps = {},
  initialIndexTab = 0,
  onTabChange,
}) => {
  const [index, setIndex] = useState(initialIndexTab);
  useEffect(() => {
    setIndex(initialIndexTab);
  }, [initialIndexTab]);
  const routes = useMemo(() => {
    return tabs.map((i) => ({
      key: i.key,
      title: i.title,
      params: { icon: i.icon },
    }));
  }, [tabs]);
  const sceneMap = useMemo(() => {
    return tabs.reduce((acc, item) => {
      return { ...acc, [item.key]: item.scene };
    }, {});
  }, [tabs]);
  const handleRenderScene = renderScene || SceneMap(sceneMap);
  const handleIndexChange = useCallback(
    (index: number) => {
      onTabChange ? onTabChange(index) : setIndex(index);
    },
    [onTabChange],
  );
  return (
    <TabView
      renderTabBar={(props) => <TabBar {...props} {...tabBarProps} />}
      navigationState={{
        index: initialIndexTab !== undefined ? initialIndexTab : index,
        routes,
      }}
      onIndexChange={handleIndexChange}
      initialLayout={initialLayout}
      renderScene={handleRenderScene}
    />
  );
};

export default Tabs;
