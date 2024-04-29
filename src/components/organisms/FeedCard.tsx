import {Image, Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';

import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {LikeButton} from 'components/atoms/buttons/LikeButton';

import {Share} from 'assets/images';

type Props = {
  openImage: () => void;
  openProfile: () => void;
};

export const FeedCard: React.FC<Props> = ({openImage, openProfile}) => {
  const [isPeeping, setIsPeeping] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Pressable className="gap-[8px]" onPress={openImage}>
      <View className="px-[10px] flex-row items-center justify-between">
        <Pressable
          className="flex-row items-center gap-[8px]"
          onPress={openProfile}>
          <View className="bg-white h-[24px] w-[24px] rounded-full" />
          <Text className="font-robotoBold color-white text-[16px]">Name</Text>
        </Pressable>

        <SmallButton
          label={isPeeping ? 'Peeping' : 'Peep'}
          onPress={() => setIsPeeping(current => !current)}
        />
      </View>

      <Image
        source={{
          uri: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
        }}
        className="w-full h-[516px]"
      />

      <View className="px-[10px] flex-row items-center justify-between">
        <View className="flex-row">
          <Text className="font-robotoRegular text-[16px] color-white">
            Girls pose at Maintown
          </Text>
          <Text className="font-robotoRegular text-[16px] color-grayMedium">
            ...
          </Text>
        </View>

        <View className="flex-row gap-[24px] items-center">
          <LikeButton
            isLiked={isLiked}
            onPress={() => setIsLiked(current => !current)}
          />
          <Share />
        </View>
      </View>
    </Pressable>
  );
};
