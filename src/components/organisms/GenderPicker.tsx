import {CustomInput} from 'components/atoms/CustomInput';
import {SelectItem} from 'components/molecules/SelectItem';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  gender: string;
  selectGender: (gender: string) => void;
  customGender: string;
  setCustomGender: (value: string) => void;
};

export const GenderPicker: React.FC<Props> = ({
  gender,
  customGender,
  selectGender,
  setCustomGender,
}) => {
  return (
    <View className="gap-[16px]">
      <View className="h-[1px] w-full bg-grayDark" />

      <Text className="color-grayLight font-robotoRegular text-[16px]">
        Gender
      </Text>

      <Text className="color-white font-robotoMedium text-[16px] h-[22px]">
        {gender !== 'Custom' ? gender : customGender}
      </Text>

      <View className="h-[1px] w-full bg-grayDark" />

      <Text className="color-grayLight font-robotoRegular text-[16px]">
        This won't be part of your public profile.
      </Text>

      <View className="gap-[16px]">
        <SelectItem
          isSelected={gender === 'Female'}
          onSelect={() => selectGender('Female')}
          label="Female"
          type="radio"
        />

        <SelectItem
          isSelected={gender === 'Male'}
          onSelect={() => selectGender('Male')}
          label="Male"
          type="radio"
        />

        <SelectItem
          isSelected={gender === 'Custom'}
          onSelect={() => selectGender('Custom')}
          label="Custom"
          type="radio"
        />

        <CustomInput
          placeholder="Custom gender"
          value={customGender}
          setValue={setCustomGender}
          disabled={gender !== 'Custom'}
        />

        <SelectItem
          isSelected={gender === 'Prefer not to say'}
          onSelect={() => selectGender('Prefer not to say')}
          label="Prefer not to say"
          type="radio"
        />
      </View>
    </View>
  );
};
