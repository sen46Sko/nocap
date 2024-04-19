import {TextInput} from 'react-native';
import React from 'react';

type Props = {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'numeric';
  disabled?: boolean;
};

export const CustomInput: React.FC<Props> = ({
  value,
  setValue,
  placeholder,
  type = 'text',
  disabled = false,
}) => {
  const inputStyle = disabled
    ? 'font-robotoRegular bg-transparent w-full shrink h-[40px] rounded-[8px] border-grayDark border-[1px] color-grayDark py-[10px] px-[20px] text-[16px]'
    : 'font-robotoRegular bg-transparent w-full shrink h-[40px] rounded-[8px] border-grayDark border-[1px] color-grayLight py-[10px] px-[20px] text-[16px]';
  const placeHolderStyle = disabled
    ? 'font-robotoRegular text-grayDark'
    : 'font-robotoRegular text-grayLight';
  return (
    <TextInput
      className={inputStyle}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      editable={!disabled}
      inputMode={type}
      placeholderClassName={placeHolderStyle}
    />
  );
};
