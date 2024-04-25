import {Pressable, Text, View} from 'react-native';
import React from 'react';

import {If} from 'components/atoms/If';

type Props = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  type: 'radio' | 'check';
};

export const SelectItem: React.FC<Props> = ({isSelected, onSelect, label}) => {
  const getRadioStyle = () => {
    return isSelected
      ? 'h-[24px] w-[24px] rounded-full border-orange border-[2px] items-center justify-center'
      : 'h-[24px] w-[24px] rounded-full border-white border-[2px] items-center justify-center';
  };
  return (
    <Pressable
      className="flex-row items-center justify-between w-full shrink"
      onPress={onSelect}>
      <Text className="color-white text-[16px] font-robotoRegular">
        {label}
      </Text>

      <View className={getRadioStyle()}>
        <If condition={isSelected}>
          <View className="w-[14px] h-[14px] bg-orange rounded-full" />
        </If>
      </View>
    </Pressable>
  );
};
