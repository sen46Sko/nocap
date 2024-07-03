import {Alert, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {LikeButton} from 'components/atoms/buttons/LikeButton';
import {If} from 'components/atoms/If';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {getUserIfExists} from 'api/users';

import {Post} from 'utils/types/Post';
import {User} from 'utils/types/User';

import {
  Calendar,
  Eye,
  EyeGray,
  MenuGray,
  Phone,
  Share as ShareIcon,
} from 'assets/images';
import {ImageAutoHeight} from 'components/atoms/ImageAutoHeight';
import {screenWidth} from 'utils/helpers';
import FastImage from 'react-native-fast-image';
import {TapGestureHandler} from 'react-native-gesture-handler';

type Props = {
  post: Post;
  openProfile: () => void;
  openMenu: () => void;
};

export const FeedCard: React.FC<Props> = ({post, openProfile, openMenu}) => {
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
    <TapGestureHandler numberOfTaps={2} onEnded={lovePost}>
      <View className="gap-[8px]">
        <View className="px-[10px] flex-row items-center justify-between">
          <Pressable
            className="flex-row items-center gap-[8px]"
            onPress={openProfile}>
            {user?.imageLink ? (
              <FastImage
                source={{uri: user?.imageLink || ''}}
                style={styles.avatar}
              />
            ) : (
              <View className="bg-white h-[24px] w-[24px] rounded-full" />
            )}
            <Text className="font-robotoBold color-white text-[16px]">
              {user?.username || ''}
            </Text>
          </Pressable>

          <If condition={post.userId !== auth.user?.id}>
            <View className="flex-row items-center gap-[8px]">
              <SmallButton
                onPress={peepUser}
                {...(!isPeeping && {label: 'Peep'})}
                {...(isPeeping && {Icon: EyeGray})}
              />
              <Pressable onPress={openMenu}>
                <MenuGray />
              </Pressable>
            </View>
          </If>
        </View>

        <ImageAutoHeight
          uri={post.imageLink}
          width={screenWidth}
          type={post.type}
        />

        <View className="px-[10px] gap-[8px]">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-[8px]">
              <LikeButton isLiked={isLoving} onPress={lovePost} />
              <Text className="font-robotoMedium color-white">
                {`${post?.loves.length || 0} Loves`}
              </Text>
            </View>

            <View className="flex-row gap-[24px] items-center">
              <View className="flex-row gap-[4px] items-center">
                <Eye />
                <Text className="font-robotoMedium color-white">
                  {post?.views.length || 0}
                </Text>
              </View>

              <Pressable onPress={onShare}>
                <ShareIcon />
              </Pressable>
            </View>
          </View>
          <Text className="font-robotoRegular text-[16px] color-white">
            {post.title}
          </Text>
          <View className="gap-[10px] mt-[32px]">
            <View className="flex-row items-center">
              <Calendar />
              <Text className="font-robotoRegular color-grayMedium text-[12px]">
                12 February 2024, 12:04 pm
              </Text>
            </View>

            <If condition={!!post?.deviceInfo}>
              <View className="flex-row items-center">
                <Phone />
                <Text className="font-robotoRegular color-grayMedium text-[12px]">
                  {post?.deviceInfo}
                </Text>
              </View>
            </If>
          </View>
        </View>
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
