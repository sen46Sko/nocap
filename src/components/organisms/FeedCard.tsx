import {Image, Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {LikeButton} from 'components/atoms/buttons/LikeButton';

import {Share} from 'assets/images';
import {getUserIfExists, setUserPeeping} from 'api/users';
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
  const [userName, setUserName] = useState('');

  const auth = useAuth();

  useEffect(() => {
    getUserIfExists(userId).then(res => setUserName(res?.username || ''));
  }, [userId]);

  useEffect(() => {
    if (auth.user?.peeps.some(id => id === userId)) {
      setIsPeeping(true);
    } else {
      setIsPeeping(false);
    }
  }, [auth.user?.peeps, userId]);

  const peepUser = () => {
    if (isPeeping) {
      setUserPeeping('unpeep', userId);
      auth.updateUser(
        {
          peeps: auth.user?.peeps
            ? auth.user.peeps.filter(id => id !== userId)
            : [],
        },
        {post: false},
      );
      setIsPeeping(false);
    } else {
      setUserPeeping('peep', userId);
      auth.updateUser(
        {
          peeps: auth.user?.peeps ? [...auth.user.peeps, userId] : [userId],
        },
        {post: false},
      );
      setIsPeeping(true);
    }
  };

  return (
    <Pressable className="gap-[8px]" onPress={openImage}>
      <View className="px-[10px] flex-row items-center justify-between">
        <Pressable
          className="flex-row items-center gap-[8px]"
          onPress={openProfile}>
          <View className="bg-white h-[24px] w-[24px] rounded-full" />
          <Text className="font-robotoBold color-white text-[16px]">
            {userName}
          </Text>
        </Pressable>

        <If condition={userId !== auth.user?.id}>
          <SmallButton
            label={isPeeping ? 'Peeping' : 'Peep'}
            onPress={peepUser}
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
