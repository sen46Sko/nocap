import {Image, SafeAreaView, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {BigButton} from 'components/atoms/buttons/BigButton';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Logo} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.WELCOME>;

export const Welcome: React.FC<Props> = ({navigation}) => {
  return (
    <View className="flex-1">
      <Image
        className=" h-4/6 w-full"
        source={require('assets/images/auth/IntroPhoto.png')}
      />

      <View className="w-full h-full shrink bg-black px-[10px] py-[6px] justify-between">
        <View className="flex-row items-center gap-[8px]">
          <Logo />
          <Text className=" font-robotoMedium text-white text-[36px]">
            natopis
          </Text>
        </View>

        <Text className=" font-robotoRegular text-grayLight text-[16px]">
          Moments on spot
        </Text>

        <SafeAreaView>
          <View className="w-full gap-[10px] flex-row mb-[40px] ">
            <BigButton
              label="Log in"
              style="gray"
              onPress={() => navigation.navigate(Screens.AUTH, {type: 'login'})}
            />

            <BigButton
              label="Sign up"
              style="white"
              onPress={() =>
                navigation.navigate(Screens.AUTH, {type: 'signup'})
              }
            />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};
