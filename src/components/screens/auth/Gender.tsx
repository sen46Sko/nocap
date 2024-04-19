import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {CustomSelectItem} from 'components/atoms/CustomSelectItem';
import {CustomButton} from 'components/atoms/CustomButton';
import {CustomInput} from 'components/atoms/CustomInput';

import {RootStackParamList, Screens} from 'utils/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, Screens.GENDER>;

export const Gender: React.FC<Props> = () => {
  const [gender, setGender] = useState('');
  const [customGender, setCustomGender] = useState('');

  const selectItem = (item: string) => {
    setCustomGender('');
    setGender(item);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View className="flex-1 px-[16px] mt-[40px] mb-[40px] justify-between">
          <View className="gap-[16px]">
            <View className="h-[1px] w-full bg-grayDark" />

            <Text className="color-grayLight font-robotoRegular text-[16px]">
              Gender
            </Text>

            <Text className="color-white font-robotoMedium text-[16px]">
              {gender !== 'Custom' ? gender : customGender}
            </Text>

            <View className="h-[1px] w-full bg-grayDark" />

            <Text className="color-grayLight font-robotoRegular text-[16px]">
              This won't be part of your public profile.
            </Text>

            <View className="gap-[24px]">
              <CustomSelectItem
                isSelected={gender === 'Female'}
                onSelect={() => selectItem('Female')}
                label="Female"
                type="radio"
              />

              <CustomSelectItem
                isSelected={gender === 'Male'}
                onSelect={() => selectItem('Male')}
                label="Male"
                type="radio"
              />

              <CustomSelectItem
                isSelected={gender === 'Custom'}
                onSelect={() => selectItem('Custom')}
                label="Custom"
                type="radio"
              />

              <CustomInput
                placeholder="Custom gender"
                value={customGender}
                setValue={setCustomGender}
                disabled={gender !== 'Custom'}
              />

              <CustomSelectItem
                isSelected={gender === 'Prefer not to say'}
                onSelect={() => selectItem('Prefer not to say')}
                label="Prefer not to say"
                type="radio"
              />
            </View>
          </View>

          <View className="items-center gap-[80px]">
            <CustomButton
              label="Create account"
              style="white"
              onPress={() => {}}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
