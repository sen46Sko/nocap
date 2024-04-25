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

import {LoaderSpinner} from 'components/molecules/LoaderSpinner';
import {CustomInput} from 'components/atoms/CustomInput';
import {BigButton} from 'components/atoms/BigButton';
import {If} from 'components/atoms/If';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Logo} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.PHONE_AUTH>;

export const PhoneAuth: React.FC<Props> = ({route, navigation}) => {
  const {type: screenType} = route.params;
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
          <View className="flex-row items-center gap-[2px]">
            <Text className="font-robotoMedium text-[36px] color-white">
              nocap
            </Text>
            <Logo />
          </View>

          <View className="w-full gap-[16px]">
            <Text className="font-robotoMedium text-[16px] color-white">
              {screenType === 'login' ? 'Log in' : 'Sign up'}
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

          <BigButton
            label={screenType === 'login' ? 'Log in' : 'Sign up'}
            style="white"
            onPress={validateOtp}
          />

          <Text className="self-center color-grayLight font-robotoRegular text-[16px]">
            OR
          </Text>

          <BigButton
            label={
              screenType === 'login'
                ? 'Log in with Google'
                : 'Sign up with Google'
            }
            style="blue"
            onPress={() => auth.signInWithGoogle()}
          />

          <View className="flex-row gap-[4px] w-full mt-[80px]">
            <Text className="text-grayLight font-robotoRegular text-[16px]">
              {screenType === 'login'
                ? "Don't have account yet?"
                : 'Already have account yet?'}
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate(Screens.PHONE_AUTH, {
                  type: screenType === 'login' ? 'signup' : 'login',
                })
              }>
              <Text className="text-white font-robotoMedium text-[16px]">
                {screenType === 'login' ? 'Sign up' : 'Log in'}
              </Text>
            </Pressable>
          </View>
        </View>

        <If condition={screenType === 'signup'}>
          <View className="absolote bottom-30 left-6">
            <Text className="text-grayLight font-robotoRegular">
              By signing up, you agree to the
            </Text>

            <View className="flex-row gap-[4px]">
              <Text className="text-grayLight font-robotoRegular">Nocap's</Text>
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
