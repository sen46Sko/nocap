import {SafeAreaView, StyleSheet, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

import {GenderPicker} from 'components/organisms/GenderPicker';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CheckOrange, CrossOrange} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.GENDER_SETTINGS
>;

export const GenderSettings: React.FC<Props> = ({navigation}) => {
  const [gender, setGender] = useState('');
  const [customGender, setCustomGender] = useState('');

  const auth = useAuth();

  useEffect(() => {
    const isCommonGender =
      auth.user?.gender === 'Male' ||
      auth.user?.gender === 'Female' ||
      auth.user?.gender === 'Prefer not to say';

    if (isCommonGender) {
      setGender(auth.user?.gender || '');
    } else {
      setGender('Custom');
      setCustomGender(auth.user?.gender || '');
    }
  }, [auth.user?.gender]);

  const selectGender = (item: string) => {
    setCustomGender('');
    setGender(item);
  };

  const submit = () => {
    auth.updateUser({gender: customGender || gender});
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[16px] py-[12px] flex-row justify-between items-center border-b border-grayDark">
        <Pressable onPress={navigation.goBack}>
          <CrossOrange />
        </Pressable>
        <Pressable onPress={submit}>
          <CheckOrange />
        </Pressable>
      </View>

      <GenderPicker
        gender={gender}
        selectGender={selectGender}
        customGender={customGender}
        setCustomGender={setCustomGender}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
