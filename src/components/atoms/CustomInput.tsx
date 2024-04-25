import {Platform, TextInput, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import React from 'react';
import classNames from 'classnames';

type Props = {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'tel' | 'numeric';
  disabled?: boolean;
  Icon?: React.FC<SvgProps>;
};

export const CustomInput: React.FC<Props> = ({
  value,
  setValue,
  placeholder,
  type = 'text',
  disabled = false,
  Icon,
}) => {
  const placeHolderStyle = disabled
    ? 'font-robotoRegular text-grayDark'
    : 'font-robotoRegular text-grayLight';

  return (
    <View
      className={classNames(
        'font-robotoRegular w-full shrink rounded-[8px] border-grayDark border-[1px] px-[16px] flex-row items-center gap-[16px]',
        {
          'py-[10px]': Platform.OS === 'ios',
        },
      )}>
      {Icon && <Icon />}
      <TextInput
        className="color-grayLight text-[16px] w-full"
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        editable={!disabled}
        inputMode={type}
        placeholderClassName={placeHolderStyle}
      />
    </View>
  );
};
