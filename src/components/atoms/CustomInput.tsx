import {Platform, TextInput, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import classNames from 'classnames';
import React from 'react';

type Props = {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'tel' | 'numeric';
  disabled?: boolean;
  Icon?: React.FC<SvgProps>;
  multiline?: boolean;
};

export const CustomInput: React.FC<Props> = ({
  value,
  setValue,
  placeholder = '',
  type = 'text',
  disabled = false,
  multiline = false,
  Icon,
}) => {
  return (
    <View
      className={classNames(
        'font-robotoRegular w-full shrink rounded-[8px] border-grayDark border-[1px] px-[16px] items-center flex-row gap-[16px]',
        {
          'py-[10px]': Platform.OS === 'ios',
          'h-full': multiline,
        },
      )}>
      {Icon && <Icon />}
      <TextInput
        className="color-white text-[16px] w-full"
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        editable={!disabled}
        inputMode={type}
        placeholderClassName={classNames('font-robotoRegular', {
          'text-grayDark': disabled,
          'text-grayLight': !disabled,
        })}
        multiline={multiline}
      />
    </View>
  );
};
