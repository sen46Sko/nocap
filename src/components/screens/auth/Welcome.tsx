import {Image, SafeAreaView, Text, View} from 'react-native';
import React from 'react';

import {Logo} from 'assets/images';
import {CustomButton} from 'components/atoms/CustomButton';

export const Welcome = () => {
  return (
    <View className="flex-1">
      <Image
        className="h-[592px] w-full"
        source={require('assets/images/auth/IntroPhoto.png')}
      />
      <View className="w-full h-full shrink bg-black px-[10px] py-[6px] justify-between">
        <View className="flex-row items-center gap-2">
          <Text className=" font-robotoMedium text-white text-[36px]">
            nocap
          </Text>

          <Logo />
        </View>

        <Text className=" font-robotoRegular text-grayLight text-[16px]">
          Moments on spot
        </Text>

        <SafeAreaView>
          <View className="flex-row w-full gap-[10px]">
            <CustomButton label="Log in" style="gray" onPress={() => {}} />
            <CustomButton label="Sign up" style="white" onPress={() => {}} />
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};
