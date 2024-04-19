import {Pressable, Text} from 'react-native';
import React from 'react';

type Props = {
  label: string;
};

export const SmallButton: React.FC<Props> = ({label}) => {
  return (
    <Pressable className="py-[5px] px-[14px] bg-grayDark rounded-[16px]">
      <Text className="color-white font-robotoMedium text-[16px]">{label}</Text>
    </Pressable>
  );
};
