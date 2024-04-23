import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Keyboard,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import {BigButton} from 'components/atoms/BigButton';
import {CustomInput} from 'components/atoms/CustomInput';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {If} from 'components/atoms/If';
import {LoaderSpinner} from 'components/atoms/LoaderSpinner';

type Props = NativeStackScreenProps<RootStackParamList, Screens.PHONE_AUTH>;

export const PhoneAuth: React.FC<Props> = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();

  const validateOtp = async () => {
    try {
      setIsLoading(true);
      if (!otp) {
        throw new Error('Please, enter OTP code');
      }
      await auth.verifyCode(otp);
    } catch (error: any) {
      console.log(error);

      if (error.code === 'auth/invalid-verification-code') {
        Alert.alert('Invalid otp code');
        return;
      }
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      if (!phone) {
        throw new Error('Please, enter phone number');
      }
      await auth.sendCodeToSMS(phone);
    } catch (error: any) {
      console.log(error);

      if (error.code === 'auth/invalid-phone-number') {
        Alert.alert('Invalid phone number');
        return;
      }

      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
                type="tel"
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
            <Pressable onPress={sendOtp}>
              <Text className="font-robotoRegular color-white">send OTP</Text>
            </Pressable>
          </View>
          <BigButton label="Log in" style="white" onPress={validateOtp} />

          <Text className="self-center color-grayLight font-robotoRegular text-[16px]">
            OR
          </Text>

          <BigButton
            label="Log in with Google"
            style="blue"
            onPress={() => auth.signInWithGoogle()}
          />
        </View>

        <If condition={isLoading}>
          <LoaderSpinner />
        </If>
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
