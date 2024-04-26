import {Animated, Pressable, Text} from 'react-native';
import React, {useRef} from 'react';
import {SvgProps} from 'react-native-svg';
import classNames from 'classnames';

type ButtonStyles =
  | 'white'
  | 'gray'
  | 'blue'
  | 'transparent'
  | 'transparentRed'
  | 'transparentGreen';

type Props = {
  label: string;
  style: ButtonStyles;
  onPress: () => void;
  Icon?: React.FC<SvgProps>;
  disabled?: boolean;
};

export const BigButton: React.FC<Props> = ({
  label,
  style,
  onPress,
  disabled = false,
  Icon,
}) => {
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
      className="w-full shrink"
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onPress={onPress}
      disabled={disabled}>
      <Animated.View
        style={{opacity: animated}}
        className={classNames(
          'px-[20px] h-[40px] w-full rounded-lg justify-end items-center flex-row gap-[8px]',
          {
            'bg-white': style === 'white',
            'bg-grayDark': style === 'gray',
            'bg-blue': style === 'blue',
            'bg-transparent':
              style === 'transparent' ||
              style === 'transparentRed' ||
              style === 'transparentGreen',
          },
        )}>
        {Icon && <Icon />}
        <Text
          className={classNames('font-robotoMedium text-[16px]', {
            'text-white':
              style === 'gray' || style === 'blue' || style === 'transparent',
            'text-black': style === 'white',
            'text-red': style === 'transparentRed',
            'text-green': style === 'transparentGreen',
          })}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};
