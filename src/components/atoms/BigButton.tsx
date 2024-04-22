import {Animated, Pressable, Text} from 'react-native';
import React, {useRef} from 'react';

type ButtonStyles = 'white' | 'gray' | 'blue';

type Props = {
  label: string;
  style: ButtonStyles;
  onPress: () => void;
};

export const BigButton: React.FC<Props> = ({label, style, onPress}) => {
  const animated = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const buttonStyles = {
    white:
      'bg-white px-[20px] h-[40px] w-full rounded-lg items-end justify-center',
    gray: 'bg-grayDark px-[20px] h-[40px] w-full rounded-lg items-end justify-center',
    blue: 'bg-blue px-[20px] h-[40px] w-full rounded-lg items-end justify-center',
  };

  const labelStyles = {
    white: 'font-robotoMedium text-[16px] text-black',
    gray: 'font-robotoMedium text-[16px] text-white',
    blue: 'font-robotoMedium text-[16px] text-white',
  };
  return (
    <Pressable
      className="w-full shrink"
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onPress={onPress}>
      <Animated.View
        style={{opacity: animated}}
        className={buttonStyles[style]}>
        <Text className={labelStyles[style]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};
