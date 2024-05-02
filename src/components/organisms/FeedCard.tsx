import {Image, Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {LikeButton} from 'components/atoms/buttons/LikeButton';

import {Share} from 'assets/images';
import {getUserIfExists} from 'api/users';
import {User} from 'utils/types/User';
import {useAuth} from 'contexts/AuthContext';
import {If} from 'components/atoms/If';

type Props = {
  title: string;
  imageLink: string;
  userId: string;
  openImage: () => void;
  openProfile: () => void;
};

export const FeedCard: React.FC<Props> = ({
  title,
  imageLink,
  userId,
  openImage,
  openProfile,
}) => {
  const [isPeeping, setIsPeeping] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const auth = useAuth();

  useEffect(() => {
    getUserIfExists(userId).then(setUser);
  }, [userId]);

  useEffect(() => {
    if (!user || !user.peepers) {
      return;
    }

    if (user?.peepers.some(id => id === auth.user?.id)) {
      setIsPeeping(true);
    } else {
      setIsPeeping(false);
    }
  }, [user, auth.user]);

  return (
    <Pressable className="gap-[8px]" onPress={openImage}>
      <View className="px-[10px] flex-row items-center justify-between">
        <Pressable
          className="flex-row items-center gap-[8px]"
          onPress={openProfile}>
          <View className="bg-white h-[24px] w-[24px] rounded-full" />
          <Text className="font-robotoBold color-white text-[16px]">
            {user?.username}
          </Text>
        </Pressable>

        <If condition={user?.id !== auth.user?.id}>
          <SmallButton
            label={isPeeping ? 'Peeping' : 'Peep'}
            onPress={() => setIsPeeping(current => !current)}
          />
        </If>
      </View>

      <Image
        source={{
          uri: imageLink,
        }}
        className="w-full h-[516px]"
      />

      <View className="px-[10px] flex-row items-center justify-between">
        <View className="flex-row">
          <Text className="font-robotoRegular text-[16px] color-white">
            {title}
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
