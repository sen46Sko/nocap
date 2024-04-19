import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Keyboard,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {BigButton} from 'components/atoms/BigButton';
import {CustomInput} from 'components/atoms/CustomInput';

import {RootStackParamList, Screens} from 'utils/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, Screens.PHONE_AUTH>;

export const PhoneAuth: React.FC<Props> = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View className="flex-1 items-center px-[16px] gap-[24px] mt-[83px]">
          <Text className="font-robotoMedium text-[36px] color-white">
            nocap
          </Text>
          <View className="w-full gap-[16px]">
            <Text className="font-robotoMedium text-[16px] color-white">
              Log in
            </Text>

            <View className="gap-[24px]">
              <CustomInput
                value={phone}
                setValue={setPhone}
                placeholder="Phone number"
              />
              <CustomInput
                value={otp}
                setValue={setOtp}
                placeholder="Enter OTP"
                type="numeric"
              />
            </View>
          </View>
          <View className="w-full items-end">
            <Pressable>
              <Text className="font-robotoRegular color-white">send OTP</Text>
            </Pressable>
          </View>
          <BigButton
            label="Log in"
            style="white"
            onPress={() => navigation.navigate(Screens.USERNAME)}
          />
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
