import {SafeAreaView, StyleSheet, Pressable, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {getDateString} from 'utils/types/helpers';

import {CheckOrange, CrossOrange} from 'assets/images';
import DatePicker from 'react-native-date-picker';
import {Timestamp} from 'firebase/firestore';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.BIRTHDATE_SETTINGS
>;

export const BirthDateSettings: React.FC<Props> = ({navigation}) => {
  const [date, setDate] = useState<Date>(new Date());

  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) {
      return;
    }

    setDate(
      new Timestamp(
        auth.user?.birthDate.seconds as number,
        auth.user?.birthDate.nanoseconds as number,
      ).toDate(),
    );
  }, [auth.user]);

  const submit = () => {
    auth.updateUser({birthDate: Timestamp.fromDate(date)});
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

      <View className="px-[16px] gap-[24px] mt-[24px] flex-1">
        <View className="gap-[8px]">
          <Text className="font-robotoRegular text-[16px] color-grayLight">
            Date of birth
          </Text>
          <Text className="font-robotoMedium text-[16px] color-white">
            {getDateString(date)}
          </Text>
        </View>

        <View className="w-full h-[1px] bg-grayDark" />

        <View className="flex-1 absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
          <DatePicker
            date={date}
            onDateChange={setDate}
            theme="dark"
            mode="date"
            locale="en_CM"
            dividerColor="#2A2929"
            maximumDate={new Date()}
          />
        </View>
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
