import React from 'react';
import {Image, Text, View} from 'react-native';

export const Welcome = () => {
  return (
    <View className=" flex-1">
      <Image
        className=" h-[592px] w-full"
        source={require('assets/images/auth/IntroPhoto.png')}
      />
      <View className="w-full h-full bg-black">
        <Text className=" font-robotoRegular text-white text-6xl">nocap</Text>
      </View>
    </View>
  );
};
