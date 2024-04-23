import {Animated, Pressable, Text} from 'react-native';
import React, {useRef} from 'react';

type Props = {
  label: string;
  onPress: () => void;
};

export const SmallButton: React.FC<Props> = ({label, onPress}) => {
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
  return (
    <Pressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onPress={onPress}
      className="py-[5px] px-[14px] bg-grayDark rounded-[16px]">
      <Animated.View style={{opacity: animated}}>
        <Text className="color-white font-robotoMedium text-[16px]">
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};
