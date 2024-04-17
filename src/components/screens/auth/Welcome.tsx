import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import React from 'react';

import {Logo} from 'assets/images';

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
            <Pressable className="bg-grayDark py-[10px] px-[20px] rounded-lg grow items-end">
              <Text className="font-robotoMedium text-[16px] text-white">
                Log in
              </Text>
            </Pressable>
            <Pressable className=" bg-white py-[10px] px-[20px] rounded-lg grow items-end">
              <Text className="font-robotoMedium text-[16px] text-black">
                Sign up
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};
