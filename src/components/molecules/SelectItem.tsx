import {Pressable, Text, View} from 'react-native';
import classNames from 'classnames';
import React from 'react';

import {If} from 'components/atoms/If';

import {Check} from 'assets/images';

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
  type,
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
          'h-[24px] w-[24px] rounded-full items-center justify-center',
          {
            'border-[2px]': type === 'radio' || !isSelected,
            'border-orange': isSelected && type === 'radio',
            'border-white': !isSelected && style === 'white',
            'border-green': !isSelected && style === 'green',
          },
        )}>
        <If condition={isSelected}>
          {type === 'radio' ? (
            <View className="w-[14px] h-[14px] bg-orange rounded-full" />
          ) : (
            <Check width={28} height={28} />
          )}
        </If>
      </View>
    </Pressable>
  );
};
