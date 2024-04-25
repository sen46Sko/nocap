import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';

import {SmallButton} from 'components/atoms/SmallButton';

import {Eye, Share} from 'assets/images';

type Props = {
  onPress: () => void;
};

export const FeedCard: React.FC<Props> = ({onPress}) => {
  return (
    <Pressable className="gap-[8px]" onPress={onPress}>
      <View className="px-[10px] flex-row items-center justify-between">
        <View className="flex-row items-center gap-[8px]">
          <View className="bg-white h-[24px] w-[24px] rounded-full" />
          <Text className="font-robotoBold color-white text-[16px]">Name</Text>
        </View>

        <SmallButton label="Peep" onPress={() => {}} />
      </View>

      <Image
        source={{
          uri: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
        }}
        className="w-full h-[516px]"
      />

      <View className="px-[10px] flex-row items-center justify-between">
        <View className="flex-row items-center gap-[8px]">
          <View className="bg-grayDark h-[32px] w-[32px] rounded-full items-center justify-center">
            <Text className="text-[20px]">😍</Text>
          </View>
          <Text className="font-robotoMedium color-white">1,310</Text>
        </View>

        <View className="flex-row gap-[24px] items-center">
          <View className="flex-row items-center gap-[4px]">
            <Eye />
            <Text className="font-robotoMedium color-grayLight">6483</Text>
          </View>
          <Share />
        </View>
      </View>
    </Pressable>
  );
};
