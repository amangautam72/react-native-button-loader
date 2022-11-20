import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import AnimatedLoader from './Loader';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ButtonLoader = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Submit');
  const [success, setSuccess] = useState<any>(null);
  const pressed = useSharedValue(false);
  const buttonWidth = useSharedValue(380);
  const textScale = useSharedValue(1);
  const iconScale = useSharedValue(0);

  const progress = useDerivedValue(() => {
    return pressed.value
      ? withTiming(1, {duration: 100, easing: Easing.linear})
      : withTiming(0, {duration: 100, easing: Easing.linear});
  });

  const scaleView = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, 0.95],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      buttonWidth.value,
      [380, 60],
      [6, 60],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      iconScale.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {
      width: buttonWidth.value,
      borderRadius,
      opacity,
      backgroundColor:
        success === null ? '#302F2F' : success ? '#2a9d8f' : '#e76f51',
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: textScale.value}],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: iconScale.value}],
    };
  });

  const changeState = () => {
    setLoading(true);

    setTimeout(() => {
      setMessage('Your request has been accepted!');
      setSuccess(true);
      setLoading(false);

      buttonWidth.value = withTiming(380, {
        duration: 500,
      });
      textScale.value = withTiming(1, {
        duration: 500,
      });
    }, 3000);
  };

  return (
    <Animated.View style={scaleView}>
      <AnimatedTouchable
        onPressIn={() => {
          pressed.value = true;
        }}
        onPressOut={() => {
          pressed.value = false;
        }}
        onPress={() => {
          buttonWidth.value = withDelay(
            50,
            withTiming(
              60,
              {
                duration: 500,
              },
              () => {
                runOnJS(changeState)();
              },
            ),
          );
          textScale.value = withTiming(0, {
            duration: 500,
          });
        }}
        activeOpacity={0.8}
        style={[styles.container, animatedStyle]}>
        <Animated.Text
          style={[styles.textStyle, textAnimatedStyle]}
          numberOfLines={1}>
          {message}{' '}
          <Text style={{fontSize: 18}}>
            {success === null ? '' : success ? `🎉` : `😢`}
          </Text>
        </Animated.Text>

        <AnimatedLoader visibility={loading} />
      </AnimatedTouchable>
      {/* <Animated.Image
        source={require('./icons/checked.png')}
        style={[
          {height: 60, width: 60, position: 'absolute', alignSelf: 'center'},
          iconStyle,
        ]}
      /> */}
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

export default ButtonLoader;
