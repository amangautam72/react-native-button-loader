import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const AnimatedLoader = ({visibility}: {visibility: boolean}) => {
  if (!visibility) return null;
  const angle = useSharedValue(0);
  const loaderScale = useSharedValue(1);
  const dotScale = useSharedValue(0);

  const loaderStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: angle.value + 'deg'}, {scale: loaderScale.value}],
    };
  });

  const dotStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: dotScale.value}],
    };
  });

  useEffect(() => {
    loaderScale.value = withSequence(
      withTiming(1.25),
      withTiming(1, {}, () => {
        dotScale.value = 1;
        angle.value = withRepeat(
          withSpring(360, {
            damping: 30,
            stiffness: 40,
            restSpeedThreshold: 10,
            restDisplacementThreshold: 10,
          }),
          -1,
        );
      }),
    );
  }, [visibility]);

  return (
    <Animated.View style={[styles.container, loaderStyle]}>
      <Animated.View style={[styles.dot, dotStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    alignSelf: 'center',
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: '#302F2F',
  },
  dot: {
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    top: 6,
  },
});

export default AnimatedLoader;
