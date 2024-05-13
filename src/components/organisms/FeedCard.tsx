import {Alert, Image, Pressable, Share, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {LikeButton} from 'components/atoms/buttons/LikeButton';
import {If} from 'components/atoms/If';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {getUserIfExists} from 'api/users';

import {Post} from 'utils/types/Post';
import {User} from 'utils/types/User';

import {EyeGray, Share as ShareIcon} from 'assets/images';

type Props = {
  post: Post;
  openImage: () => void;
  openProfile: () => void;
};

export const FeedCard: React.FC<Props> = ({post, openImage, openProfile}) => {
  const [isPeeping, setIsPeeping] = useState(false);
  const [isLoving, setIsLoving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const auth = useAuth();
  const posts = usePosts();

  useEffect(() => {
    getUserIfExists(post.userId).then(setUser);
  }, [post.userId]);

  useEffect(() => {
    if (auth.user?.peeps && auth.user.peeps.some(id => id === post.userId)) {
      setIsPeeping(true);
    } else {
      setIsPeeping(false);
    }
  }, [auth.user?.peeps, post.userId]);

  useEffect(() => {
    if (post.loves.some(id => id === auth.user?.id)) {
      setIsLoving(true);
    } else {
      setIsLoving(false);
    }
  }, [auth.user?.id, post.loves]);

  const peepUser = () => {
    if (isPeeping) {
      auth.setPeeping('unpeep', post.userId);
      setIsPeeping(false);
    } else {
      auth.setPeeping('peep', post.userId);
      setIsPeeping(true);
    }
  };

  const lovePost = () => {
    if (isLoving) {
      posts.setLoving('unlove', post.id);
      setIsLoving(false);
    } else {
      posts.setLoving('love', post.id);
      setIsLoving(true);
    }
  };

  const onShare = () => {
    try {
      Share.share(
        {
          url: 'https://www.google.com',
        },
        {tintColor: '#000000'},
      );
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Pressable className="gap-[8px]" onPress={openImage}>
      <View className="px-[10px] flex-row items-center justify-between">
        <Pressable
          className="flex-row items-center gap-[8px]"
          onPress={openProfile}>
          <Image
            source={{uri: user?.imageLink || ''}}
            className="bg-white h-[24px] w-[24px] rounded-full"
          />
          <Text className="font-robotoBold color-white text-[16px]">
            {user?.username || ''}
          </Text>
        </Pressable>

        <If condition={post.userId !== auth.user?.id}>
          <SmallButton
            onPress={peepUser}
            {...(!isPeeping && {label: 'Peep'})}
            {...(isPeeping && {Icon: EyeGray})}
          />
        </If>
      </View>

      <Image
        source={{
          uri: post.imageLink,
        }}
        className="w-full h-[516px]"
      />

      <View className="px-[10px] flex-row items-center justify-between">
        <View className="flex-row">
          <Text className="font-robotoRegular text-[16px] color-white">
            {post.title}
          </Text>
        </View>

        <View className="flex-row gap-[24px] items-center">
          <LikeButton isLiked={isLoving} onPress={lovePost} />
          <Pressable onPress={onShare}>
            <ShareIcon />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
