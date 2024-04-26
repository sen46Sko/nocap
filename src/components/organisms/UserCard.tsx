import {Image, Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';

import {Cross} from 'assets/images';

export const UserCard = () => {
  const [isPeeping, setIsPeeping] = useState(false);

  return (
    <View className="p-[10px] border border-grayDark rounded-[8px] gap-[8px]">
      <Image
        source={{
          uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
        }}
        className="w-[121px] h-[129px] rounded-[4px]"
      />

      <View className="flex-row justify-between">
        <View className="gap-[4px]">
          <Text className="font-robotoMedium color-white">Ashley_v</Text>
          <Text className="font-robotoMedium color-grayLight">
            Ashley vincent
          </Text>
        </View>

        <Cross />
      </View>

      <Pressable
        className="bg-white w-full py-[5px] items-center rounded-[4px]"
        onPress={() => setIsPeeping(current => !current)}>
        <Text className="font-robotoMedium text-[16px]">
          {isPeeping ? 'Peeping' : 'Peep'}
        </Text>
      </Pressable>
    </View>
  );
};
