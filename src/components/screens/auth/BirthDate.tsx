import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

import {BigButton} from 'components/atoms/BigButton';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {getAge, getDateString} from 'utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, Screens.BIRTH_DATE>;

export const BirthDate: React.FC<Props> = ({navigation}) => {
  const [date, setDate] = useState(new Date());

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

        <View className="items-center gap-[80px]">
          <DatePicker
            date={date}
            onDateChange={setDate}
            theme="dark"
            mode="date"
            locale="en_MV"
          />

          <Text className="color-grayLight font-robotoRegular text-[16px]">
            {`You are ${getAge(date)} years young!`}
          </Text>

          <BigButton
            label="Continue"
            style="white"
            onPress={() => navigation.navigate(Screens.GENDER)}
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
