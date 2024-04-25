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

import {CustomInput} from 'components/atoms/CustomInput';
import {SelectItem} from 'components/molecules/SelectItem';
import {BigButton} from 'components/atoms/BigButton';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, Screens.GENDER>;

export const Gender: React.FC<Props> = ({navigation}) => {
  const [gender, setGender] = useState('');
  const [customGender, setCustomGender] = useState('');

  const auth = useAuth();

  const saveGender = () => {
    auth.setLocalUser(current => ({
      ...current,
      gender: customGender || gender,
    }));
    navigation.navigate(Screens.FINISH_SIGNUP);
  };

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

            <Text className="color-white font-robotoMedium text-[16px] h-[22px]">
              {gender !== 'Custom' ? gender : customGender}
            </Text>

            <View className="h-[1px] w-full bg-grayDark" />

            <Text className="color-grayLight font-robotoRegular text-[16px]">
              This won't be part of your public profile.
            </Text>

            <View className="gap-[24px]">
              <SelectItem
                isSelected={gender === 'Female'}
                onSelect={() => selectItem('Female')}
                label="Female"
                type="radio"
              />

              <SelectItem
                isSelected={gender === 'Male'}
                onSelect={() => selectItem('Male')}
                label="Male"
                type="radio"
              />

              <SelectItem
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

              <SelectItem
                isSelected={gender === 'Prefer not to say'}
                onSelect={() => selectItem('Prefer not to say')}
                label="Prefer not to say"
                type="radio"
              />
            </View>
          </View>

          <View className="items-center gap-[80px]">
            <BigButton
              label="Create account"
              style="white"
              onPress={saveGender}
              disabled={!gender || (gender === 'Custom' && !customGender)}
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
