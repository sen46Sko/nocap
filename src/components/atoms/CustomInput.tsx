import React from 'react';
import {TextInput} from 'react-native';

type Props = {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'numeric';
};

export const CustomInput: React.FC<Props> = ({
  value,
  setValue,
  placeholder,
  type = 'text',
}) => {
  return (
    <TextInput
      className="font-robotoRegular bg-transparent w-full shrink h-[40px] rounded-[8px] border-grayDark border-[1px] color-grayLight py-[10px] px-[20px] text-[16px]"
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      inputMode={type}
      placeholderClassName="font-robotoRegular text-grayLight"
    />
  );
};
