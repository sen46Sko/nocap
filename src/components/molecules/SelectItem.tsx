import {Pressable, Text, View} from 'react-native';
import React from 'react';

import {If} from 'components/atoms/If';
import classNames from 'classnames';

type Props = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  type: 'radio' | 'check';
  style?: 'white' | 'green';
};

export const SelectItem: React.FC<Props> = ({
  isSelected,
  onSelect,
  label,
  style = 'white',
}) => {
  return (
    <Pressable
      className="flex-row items-center justify-between w-full shrink"
      onPress={onSelect}>
      <Text
        className={classNames('text-[16px] font-robotoRegular', {
          'color-white': style === 'white',
          'color-green': style === 'green',
        })}>
        {label}
      </Text>

      <View
        className={classNames(
          'h-[24px] w-[24px] rounded-full border-[2px] items-center justify-center',
          {
            'border-orange': isSelected,
            'border-white': !isSelected && style === 'white',
            'border-green': !isSelected && style === 'green',
          },
        )}>
        <If condition={isSelected}>
          <View className="w-[14px] h-[14px] bg-orange rounded-full" />
        </If>
      </View>
    </Pressable>
  );
};
