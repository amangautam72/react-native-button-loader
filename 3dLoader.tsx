import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const randomColor = () => {
  'worklet';
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()
  );
};

const ThreeDLoader = () => {
  const margin = useSharedValue(0);
  const zIndex = useSharedValue(1);

  useEffect(() => {
    margin.value = withRepeat(withTiming(70, {duration: 2000}), -1, true);
  }, []);

  const sharedStyle = useAnimatedStyle(() => {
    return {
      marginLeft: margin.value,
    };
  });

  const sharedStyle2 = useAnimatedStyle(() => {
    const marginLeft = interpolate(margin.value, [0, 70], [70, 0]);
    return {
      marginLeft,
    };
  });

  const sharedStyle3 = useAnimatedStyle(() => {
    if (margin.value >= 68) {
      zIndex.value = 0;
    } else if (margin.value <= 2) {
      zIndex.value = 1;
    }
    return {zIndex: zIndex.value};
  });

  const sharedStyle4 = useAnimatedStyle(() => {
    const color = interpolate(zIndex.value, [0, 1], [0, 1]);
    return {
      backgroundColor: color ? randomColor() : randomColor(),
    };
  });

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        },
        sharedStyle4,
      ]}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: 140,
          },
          sharedStyle3,
        ]}>
        <Animated.View
          style={[
            {
              height: 70,
              width: 70,
              backgroundColor: 'black',
              borderRadius: 50,
            },
            sharedStyle2,
          ]}
        />
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          width: 140,
        }}>
        <Animated.View
          style={[
            {
              height: 70,
              width: 70,
              backgroundColor: 'white',
              borderRadius: 50,
              borderWidth: 5,
            },
            sharedStyle,
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 360,
    backgroundColor: '#264653',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    transform: [{rotateZ: '360deg'}],
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default ThreeDLoader;
