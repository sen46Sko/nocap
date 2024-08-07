import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Keyboard,
  Alert,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {PhoneNumberInput} from 'components/molecules/PhoneNumberInput';
import {LoaderSpinner} from 'components/organisms/LoaderSpinner';
import {CustomInput} from 'components/atoms/CustomInput';
import {BigButton} from 'components/atoms/buttons/BigButton';
import {If} from 'components/atoms/If';

import {useAuth} from 'contexts/AuthContext';

import {useTimer} from 'hooks/useTimer';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Google, Logo} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.AUTH>;

export const PhoneAuth: React.FC<Props> = ({route, navigation}) => {
  const {type: screenType} = route.params;
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const auth = useAuth();
  const timer = useTimer();

  const validateOtp = async () => {
    try {
      setIsLoading(true);
      if (!otp) {
        throw new Error('Please, enter OTP code');
      }
      await auth.verifyCode(otp);
      timer.clearTimer();
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
      await auth.sendCodeToSMS(phone);
      setIsOtpSent(true);
      timer.setTimer(59);
    } catch (error: any) {
      console.log(error);

      if (error.code === 'auth/invalid-phone-number') {
        Alert.alert('Invalid phone number');
        return;
      }

      Alert.alert(error.message);
    } finally {
      Alert.alert(`OTP was sent to ${phone}`);
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View className="flex-1 items-center px-[16px] mt-[83px] gap-[16px]">
          <View className="flex-row items-center gap-[8px]">
            <Logo />
            <Text className="font-robotoMedium text-[36px] color-white">
              natopis
            </Text>
          </View>
          <View className="w-full gap-[16px]">
            <Text className="font-robotoMedium text-[16px] color-white">
              {screenType === 'login' ? 'Log in' : 'Sign up'}
            </Text>

            <View className="gap-[24px]">
              <PhoneNumberInput value={phone} onChange={setPhone} />

              <CustomInput
                value={otp}
                setValue={setOtp}
                placeholder="Enter OTP"
                type="numeric"
              />
            </View>
          </View>

          <View className="w-full flex-row justify-between">
            <Text className="color-orange font-robotoRegular">
              <If condition={!!timer.current}>
                {`resending OTP in 0:${('0' + timer.current).slice(-2)} s`}
              </If>
            </Text>

            <Pressable onPress={sendOtp} disabled={!phone || timer.current > 0}>
              <Text className="font-robotoRegular color-white">
                {isOtpSent ? 'resent OTP' : 'sent OTP'}
              </Text>
            </Pressable>
          </View>

          <BigButton
            label={screenType === 'login' ? 'Log in' : 'Sign up'}
            style="white"
            onPress={validateOtp}
          />

          <Text className="color-grayLight font-robotoRegular text-[16px]">
            OR
          </Text>

          <BigButton
            label={
              screenType === 'login'
                ? 'Log in with Google'
                : 'Sign up with Google'
            }
            style="gray"
            onPress={() => auth.signInWithGoogle()}
            Icon={Google}
          />

          <View className="flex-row gap-[4px] w-full mt-[80px]">
            <Text className="text-grayLight font-robotoRegular text-[16px]">
              {screenType === 'login'
                ? "Don't have account yet?"
                : 'Already have account yet?'}
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate(Screens.AUTH, {
                  type: screenType === 'login' ? 'signup' : 'login',
                })
              }>
              <Text className="text-white font-robotoMedium text-[16px]">
                {screenType === 'login' ? 'Sign up' : 'Log in'}
              </Text>
            </Pressable>
          </View>

          <If condition={screenType === 'signup'}>
            <View className="w-full absolute bottom-[40px]">
              <Text className="text-grayLight font-robotoRegular">
                By signing up, you agree to the
              </Text>

              <View className="flex-row gap-[4px]">
                <Text className="text-grayLight font-robotoRegular">
                  Nocap's
                </Text>
                <Text className="text-white font-robotoRegular">
                  Terms of Use
                </Text>

                <Text className="text-grayLight font-robotoRegular">and</Text>
                <Text className="text-white font-robotoRegular">
                  Privacy Policy
                </Text>
              </View>
            </View>
          </If>
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
