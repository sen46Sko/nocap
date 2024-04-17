import {Pressable, Text} from 'react-native';
import React from 'react';

type ButtonStyles = 'white' | 'gray' | 'blue';

type Props = {
  label: string;
  style: ButtonStyles;
  onPress: () => void;
};

export const CustomButton: React.FC<Props> = ({label, style, onPress}) => {
  const buttonStyles = {
    white:
      'bg-white px-[20px] h-[40px] w-full rounded-lg shrink items-end justify-center',
    gray: 'bg-grayDark px-[20px] h-[40px] w-full rounded-lg shrink items-end justify-center',
    blue: 'bg-blue px-[20px] h-[40px] w-full rounded-lg shrink items-end justify-center',
  };

  const labelStyles = {
    white: 'font-robotoMedium text-[16px] text-black',
    gray: 'font-robotoMedium text-[16px] text-white',
    blue: 'font-robotoMedium text-[16px] text-white',
  };
  return (
    <Pressable className={buttonStyles[style]} onPress={onPress}>
      <Text className={labelStyles[style]}>{label}</Text>
    </Pressable>
  );
};
