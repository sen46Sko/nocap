import {Animated, Pressable, Text} from 'react-native';
import React, {useRef} from 'react';
import {SvgProps} from 'react-native-svg';

type Props = {
  label?: string;
  onPress: () => void;
  Icon?: React.FC<SvgProps>;
};

export const SmallButton: React.FC<Props> = ({label = '', onPress, Icon}) => {
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
      <Animated.View
        style={{opacity: animated}}
        className="flex-row gap-[8px] items-center">
        <Text className="color-white font-robotoMedium text-[16px]">
          {label}
        </Text>
        {Icon && <Icon width={18} height={18} />}
      </Animated.View>
    </Pressable>
  );
};
