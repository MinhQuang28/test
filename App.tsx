import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Box = ({backgroundColor = '#3cae6f', scale = 1}) => (
  <Animated.View
    style={[
      {
        width: 100,
        height: 100,
        backgroundColor,
        transform: [{scale}],
      },
    ]}
  />
);
const usePulse = (startDelay = 500) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, {toValue: 1.2, useNativeDriver: false}),
      Animated.timing(scale, {toValue: 0.8, useNativeDriver: false}),
    ]).start(() => pulse());
  };

  useEffect(() => {
    const timeout = setTimeout(() => pulse(), startDelay);
    return () => clearTimeout(timeout);
  }, []);

  return scale;
};

const Item = ({count}) => {
  const scale = usePulse();
  const scale2 = usePulse(750);

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
      <Box scale={scale2} backgroundColor="#1f9cb8" />
      <Text>{count}</Text>
      <Box scale={scale} />
      <AntDesign name="bars" size={30} />
    </View>
  );
};

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('log count', count);
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);
  return <Item count={count} />;
};
export default App;
