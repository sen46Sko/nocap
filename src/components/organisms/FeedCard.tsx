import {Image, Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {LikeButton} from 'components/atoms/buttons/LikeButton';
import {If} from 'components/atoms/If';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {getUserIfExists} from 'api/users';

import {Post} from 'utils/types/Post';

import {Share} from 'assets/images';

type Props = {
  post: Post;
  openImage: () => void;
  openProfile: () => void;
};

export const FeedCard: React.FC<Props> = ({post, openImage, openProfile}) => {
  const [isPeeping, setIsPeeping] = useState(false);
  const [isLoving, setIsLoving] = useState(false);
  const [userName, setUserName] = useState('');

  const auth = useAuth();
  const posts = usePosts();

  useEffect(() => {
    getUserIfExists(post.userId).then(res => setUserName(res?.username || ''));
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

        <If condition={post.userId !== auth.user?.id}>
          <SmallButton
            label={isPeeping ? 'Peeping' : 'Peep'}
            onPress={peepUser}
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
          <Share />
        </View>
      </View>
    </Pressable>
  );
};
