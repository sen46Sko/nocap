import {Animated, Pressable, Text} from 'react-native';
import React, {useRef} from 'react';
import {SvgProps} from 'react-native-svg';
import classNames from 'classnames';

import {If} from 'components/atoms/If';

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
      className={classNames('px-[14px] rounded-[8px] h-[30px] justify-center', {
        'w-[64px] bg-black border border-[#272626]': !label,
        'bg-grayDark': !!label,
      })}>
      <Animated.View
        style={{opacity: animated}}
        className="flex-row gap-[8px] items-center justify-center">
        <If condition={!!label}>
          <Text className="color-white font-robotoMedium text-[16px]">
            {label}
          </Text>
        </If>
        {Icon && <Icon />}
      </Animated.View>
    </Pressable>
  );
};
