import {SafeAreaView, StyleSheet, Pressable, View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';

import {CustomInput} from 'components/atoms/CustomInput';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CheckOrange, CrossOrange, SearchGray} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.LANGUAGE_SETTINGS
>;

const languages = [
  'English (US)',
  'English (UK)',
  'Hindi',
  'Kannada',
  'Telugu',
  'Tamil',
  'Urdu',
  'Ukrainian',
  'Polish',
  'Spanish',
  'Japanese',
  'Korean',
];

export const LanguageSettings: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[16px] py-[12px] flex-row justify-between items-center border-b border-grayDark">
        <Pressable onPress={navigation.goBack}>
          <CrossOrange />
        </Pressable>
        <Pressable onPress={navigation.goBack}>
          <CheckOrange />
        </Pressable>
      </View>

      <View className="mt-[16px] gap-[16px] px-[16px]">
        <CustomInput
          value={searchQuery}
          setValue={setSearchQuery}
          placeholder="Search"
          Icon={SearchGray}
        />

        {languages
          .filter(language => language.includes(searchQuery))
          .map(language => (
            <Text
              className="font-robotoRegular text-[16px] color-white"
              key={language}>
              {language}
            </Text>
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
