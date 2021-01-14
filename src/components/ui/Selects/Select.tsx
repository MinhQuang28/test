import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  ListRenderItemInfo,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import {lowerCase, groupBy, upperCase} from 'lodash';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {css} from 'styled-components/native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State,
  PanGestureHandlerStateChangeEvent,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';

import {
  Grey02,
  Grey03,
  Grey04,
  Primary,
  Transparent,
  White,
} from '../../../themes/colors';
import Text from '../View/Text';
import {BodyLarge, H3, H4} from '../Heading/Heading';
import {normalizeSpace} from '../../../utils/style.util';
import BottomCard from '../BottomCard/BottomCard';
import {Image, TouchableOpacity, View} from '../index';
import Input from '../Inputs/Input';
import {HeaderHeight, ScreenHeight} from '../../../themes/size';
import images from '../../../assets/images/images';
import Backdrop from '../Backdrop/Backdrop';
import {Bold} from '../../../themes/fonts';
import {AndroidOS, IOS} from '../../../utils/platform.util';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useHeaderHeight} from '@react-navigation/stack';
const MAX_HEIGHT = ScreenHeight - 130;
const AlphabetCharacterHeight = 18;
const SelectItemHeight = 47;

const SelectContainer = styled.TouchableOpacity<{focused?: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${White};
  padding: 0 25px;
  height: 54px;
  border-radius: 10px;
  ${(props) =>
    props.focused
      ? css`
          border: 1.5px solid ${Primary};
        `
      : css`
          border: 1.5px solid ${Transparent};
        `}
`;

const SuffixWrapper = styled(View)`
  margin-left: -4px;
  margin-right: 10px;
`;

const PrefixWrapper = styled(View)`
  margin-right: -4px;
  margin-left: 10px;
`;

const DefaultLabel = styled(H4)`
  margin-bottom: ${normalizeSpace(16)}px;
`;

const StyledBottomCard = styled(BottomCard)`
  height: 100%;

  padding: 32px 32px 0 32px;
`;

const ValueText = styled(Text)`
  flex: 1;
`;
const PlaceholderText = styled(ValueText)`
  color: ${Grey02};
`;

export type Option = {
  value: string;
  label: string;
};

interface Props {
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  label?: string | ReactElement;
  containerStyle?: ViewStyle;
  options: Option[];
  onChange?: (value: string) => void;
  renderSuffix?: ReactElement;
  renderPrefix?: ReactElement;
  renderAlphabet?: boolean;
}

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: Option) => void;
  options: Option[];
  headerLabel: string | undefined;
  renderAlphabet?: boolean;
}

const AnimatedBottomCard = Animated.createAnimatedComponent(StyledBottomCard);

const toAlphabet = (v: string) => {
  const character = lowerCase(v)[0];
  if (!isNaN(Number(character))) {
    return '#';
  }
  return upperCase(v)[0];
};

const SelectItem: FC<{
  onSelect: any;
  onClose: () => void;
  item: Option;
}> = React.memo(({onSelect, item, onClose}) => {
  const handlePress = useCallback(() => {
    onSelect(item);
    onClose();
  }, [onClose, onSelect, item]);
  return (
    <TouchableOpacity style={{height: SelectItemHeight}} onPress={handlePress}>
      <View flexGrow justifyCenter>
        <H4>{item.label}</H4>
      </View>
    </TouchableOpacity>
  );
});

const ModalSelectOption = gestureHandlerRootHOC<ModalProps>(
  ({visible, onClose, onSelect, headerLabel, options, renderAlphabet}) => {
    const [activeAlphabetIndex, setActiveAlphabetIndex] = useState(0);
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const sectionListRef = useRef<FlatList>(null);
    const [alphabetHeight, setAlphabetHeight] = useState(0);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const dragY = useRef(new Animated.Value(0)).current;
    const statusbarHeight = useHeaderHeight();
    useEffect(() => {
      setActiveAlphabetIndex(0);
      if (visible) {
        setShow(true);
        slideAnimation.setValue(MAX_HEIGHT);
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.elastic(0.7),
        }).start();
      } else {
        Animated.timing(slideAnimation, {
          toValue: MAX_HEIGHT,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.elastic(0.7),
        }).start(() => setShow(false));
      }
    }, [slideAnimation, visible]);

    const opacity = slideAnimation.interpolate({
      inputRange: [0, MAX_HEIGHT],
      outputRange: [0.8, 0],
    });
    const listOptionWithFilter = useMemo(() => {
      if (!search) {
        return options;
      }
      return options.filter(
        (option) =>
          lowerCase(option.value)?.indexOf(lowerCase(search)) > -1 ||
          lowerCase(option.label)?.indexOf(lowerCase(search)) > -1,
      );
    }, [options, search]);
    const listSectionList = useMemo(() => {
      const grouped = groupBy(listOptionWithFilter, (i) => toAlphabet(i.label));
      return Object.keys(grouped).map((i, index, array) => ({
        title: i,
        data: grouped[i] || [],
      }));
    }, [listOptionWithFilter]);
    const listAlphabet = useMemo(() => {
      return [...listSectionList]
        .sort((a, b) => b.data.length - a.data.length)
        .map((i) => i.title)
        .slice(0, alphabetHeight / AlphabetCharacterHeight)
        .sort();
      // list alphabet depend on wrapper height, if wrapper height cannot contain all character so it will filter with higher number item of this alphabet
    }, [alphabetHeight, listSectionList]);
    const renderItem = useCallback(
      ({item, index}: ListRenderItemInfo<Option>) => (
        <SelectItem item={item} onSelect={onSelect} onClose={onClose} />
      ),
      [onClose, onSelect],
    );
    const getItemLayout = (data: any, index: number) => {
      return {
        length: SelectItemHeight,
        offset: SelectItemHeight * index,
        index,
      };
    };
    const keyExtractor = useCallback((i: Option) => String(i.value), []);
    const renderList = useCallback(() => {
      return (
        <FlatList
          data={listOptionWithFilter}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          keyboardShouldPersistTaps={'handled'}
        />
      );
    }, [keyExtractor, listOptionWithFilter, renderItem]);
    const onTapOrPanAlphabet = useCallback(
      (
        e: TapGestureHandlerStateChangeEvent | PanGestureHandlerGestureEvent,
      ) => {
        const index = Math.max(
          0,
          Math.min(
            Math.floor(e.nativeEvent.y / AlphabetCharacterHeight),
            listAlphabet.length - 1,
          ),
        ); // min 0 and max is length - 1
        const character = listAlphabet[index];
        const sectionIndex = listOptionWithFilter.findIndex(
          (i) => toAlphabet(i.label) === character,
        );
        // setActiveAlphabetIndex(index);
        (sectionListRef as any).current.scrollToIndex({
          index: sectionIndex,
          animated: false,
        });
      },
      [listAlphabet, listOptionWithFilter],
    );
    const onLayoutAlphabet = useCallback(
      (e: LayoutChangeEvent) => {
        if (alphabetHeight !== e.nativeEvent.layout.height) {
          setAlphabetHeight(e.nativeEvent.layout.height);
        }
      },
      [alphabetHeight],
    );
    const handleGestureStateChange = useCallback(
      (e: PanGestureHandlerStateChangeEvent) => {
        if (e.nativeEvent.oldState === State.ACTIVE) {
          const {velocityY, translationY} = e.nativeEvent;
          const dragToss = 0.05;
          const endOffsetY = translationY + dragToss * velocityY;
          if (endOffsetY > MAX_HEIGHT / 2) {
            Animated.timing(dragY, {
              toValue: MAX_HEIGHT,
              duration: 300,
              useNativeDriver: true,
              easing: Easing.elastic(0.7),
            }).start(() => onClose());
          } else {
            Animated.timing(dragY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
              easing: Easing.elastic(0.7),
            }).start();
          }
        }
      },
      [dragY, onClose],
    );
    const handleScroll = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.max(
          0,
          Math.min(
            listOptionWithFilter.length - 1,
            Math.floor(e.nativeEvent.contentOffset.y / SelectItemHeight),
          ),
        );
        const firstCharacter = toAlphabet(listOptionWithFilter[index].label);
        setActiveAlphabetIndex(listAlphabet.indexOf(firstCharacter));
      },
      [listAlphabet, listOptionWithFilter],
    );
    const handlePressAlphabetAndroid = useCallback(
      (i) => {
        const sectionIndex = listOptionWithFilter.findIndex(
          (option) => toAlphabet(option.label) === i,
        );
        // setActiveAlphabetIndex(index);
        if (sectionListRef) {
          (sectionListRef as any).current.scrollToIndex({
            index: sectionIndex,
            animated: false,
          });
        }
      },
      [listOptionWithFilter],
    );
    const renderListEmpty = useCallback(() => {
      return <BodyLarge style={{color: Grey04}}>Không có dữ liệu.</BodyLarge>;
    }, []);
    const renderAlphabetList = useCallback(() => {
      return (
        <>
          <FlatList
            onScroll={handleScroll}
            ref={sectionListRef}
            showsVerticalScrollIndicator={false}
            data={listOptionWithFilter}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            ListEmptyComponent={renderListEmpty()}
          />
          <TapGestureHandler onHandlerStateChange={onTapOrPanAlphabet}>
            <PanGestureHandler onGestureEvent={onTapOrPanAlphabet}>
              <View
                onLayout={onLayoutAlphabet}
                style={[
                  {position: 'absolute', right: 0, top: 0, bottom: 0},
                  {zIndex: 99999999},
                ]}>
                {listAlphabet.map((i, index) => (
                  <TouchableOpacity
                    center
                    onPress={
                      AndroidOS
                        ? () => handlePressAlphabetAndroid(i)
                        : undefined
                    }
                    key={i}
                    style={{height: AlphabetCharacterHeight}}>
                    <Text
                      style={[
                        {
                          color: Grey03,
                          fontFamily: Bold,
                          fontSize: 12,
                          fontWeight: '500',
                        },
                        activeAlphabetIndex === index && {color: Primary},
                      ]}>
                      {i}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </PanGestureHandler>
          </TapGestureHandler>
        </>
      );
    }, [
      activeAlphabetIndex,
      handlePressAlphabetAndroid,
      handleScroll,
      keyExtractor,
      listAlphabet,
      listOptionWithFilter,
      onLayoutAlphabet,
      onTapOrPanAlphabet,
      renderItem,
      renderListEmpty,
    ]);

    return (
      <Modal visible={show} onRequestClose={onClose} transparent={true}>
        <Backdrop onClose={onClose} opacity={0} />
        <AnimatedBottomCard
          top={statusbarHeight}
          style={{
            transform: [
              {
                translateY: Animated.add(slideAnimation, dragY),
              },
            ],
            top: AndroidOS ? 0 : getStatusBarHeight(),
          }}>
          <PanGestureHandler
            simultaneousHandlers={[sectionListRef]}
            onGestureEvent={Animated.event(
              [{nativeEvent: {translationY: dragY}}],
              {
                useNativeDriver: true,
              },
            )}
            onHandlerStateChange={handleGestureStateChange}>
            <Animated.View>
              <View flexRow justifySpaceBetween center>
                <H3>{headerLabel}</H3>
                <TouchableOpacity onPress={onClose}>
                  <Image source={images.common.icClose} />
                </TouchableOpacity>
              </View>
              <View my={5}>
                <Input
                  renderSuffix={<Image source={images.common.iconSearch} />}
                  inputType={'outline'}
                  value={search}
                  onChangeText={setSearch}
                  clearButtonMode="while-editing"
                />
              </View>
            </Animated.View>
          </PanGestureHandler>
          <KeyboardAvoidingView keyboardVerticalOffset={130} style={{flex: 1}}>
            {renderAlphabet ? renderAlphabetList() : renderList()}
          </KeyboardAvoidingView>
        </AnimatedBottomCard>
      </Modal>
    );
  },
);

const Select: FC<Props> = ({
  value,
  label,
  containerStyle,
  options,
  placeholder,
  onChange,
  renderSuffix,
  renderPrefix,
  disabled,
  renderAlphabet = false,
}) => {
  const [show, setShow] = useState(false);

  const handleSelect = useCallback(
    (option: Option) => {
      if (!disabled) {
        onChange && onChange(option.value);
      }
    },
    [disabled, onChange],
  );
  const selectLabel = useMemo(() => {
    return options.find((option) => option.value === value)?.label;
  }, [options, value]);
  const handleShowSelect = useCallback(() => {
    if (!disabled) {
      setShow(true);
    }
  }, [disabled]);

  const defaultPrefix = (
    <Image
      source={images.common.iconRightArrow}
      style={{tintColor: disabled ? Grey02 : Grey03}}
    />
  );
  const rPrefix = renderPrefix !== undefined ? renderPrefix : defaultPrefix;
  return (
    <View style={containerStyle}>
      <ModalSelectOption
        headerLabel={
          typeof label === 'string' ? label : placeholder || undefined
        }
        options={options}
        onClose={() => setShow(false)}
        visible={show}
        onSelect={handleSelect}
        renderAlphabet={renderAlphabet}
      />
      {typeof label === 'string' ? <DefaultLabel>{label}</DefaultLabel> : label}
      <SelectContainer focused={show} onPress={handleShowSelect}>
        {renderSuffix && <SuffixWrapper>{renderSuffix}</SuffixWrapper>}
        {placeholder && !selectLabel ? (
          <PlaceholderText style={{color: disabled ? Grey02 : Grey03}}>
            {placeholder}
          </PlaceholderText>
        ) : (
          <ValueText>{selectLabel}</ValueText>
        )}
        {rPrefix && <PrefixWrapper>{rPrefix}</PrefixWrapper>}
      </SelectContainer>
    </View>
  );
};

export default Select;
