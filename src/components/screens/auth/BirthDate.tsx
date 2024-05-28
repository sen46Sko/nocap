import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Timestamp} from 'firebase/firestore';
import DatePicker from 'react-native-date-picker';

import {BigButton} from 'components/atoms/buttons/BigButton';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {isBirthDateValid, getAge} from 'utils/helpers/auth';
import {getDateString} from 'utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, Screens.BIRTH_DATE>;

export const BirthDate: React.FC<Props> = ({navigation}) => {
  const [date, setDate] = useState(new Date());

  const auth = useAuth();

  const saveBirthDate = () => {
    const isValid = isBirthDateValid(date);

    if (!isValid) {
      Alert.alert('You should be older');
      return;
    }

    auth.setLocalUser(current => ({
      ...current,
      birthDate: Timestamp.fromDate(date),
    }));
    navigation.navigate(Screens.GENDER);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1 px-[16px] mt-[40px] mb-[40px] justify-between">
        <View className="gap-[16px]">
          <Text className="color-grayLight font-robotoRegular text-[16px]">
            Wait! we need to know your age
          </Text>

          <View className="h-[1px] w-full bg-grayDark" />

          <Text className="color-grayLight font-robotoRegular text-[16px]">
            Date of Birth
          </Text>

          <Text className="color-white font-robotoMedium text-[16px]">
            {getDateString(date)}
          </Text>

          <View className="h-[1px] w-full bg-grayDark" />
        </View>

        <View className="items-center justify-center flex-1 ">
          <DatePicker
            date={date}
            onDateChange={setDate}
            theme="dark"
            mode="date"
            locale="en_CM"
            dividerColor="#2A2929"
            maximumDate={new Date()}
          />
          <View className="absolute w-full bottom-0">
            <BigButton
              label={`Yes I'm ${getAge(date)} years old`}
              style="white"
              onPress={saveBirthDate}
            />
          </View>
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
