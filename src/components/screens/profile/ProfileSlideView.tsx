import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Share,
  Alert,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {CustomBottomSheet} from 'components/organisms/CustomBottomSheet';
import {AlbumsMenu} from 'components/organisms/bottomSheetScreens/AlbumsMenu';
import {LikeButton} from 'components/atoms/buttons/LikeButton';
import {If} from 'components/atoms/If';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {BottomSheetType} from 'utils/types/BottomSheetType';
import {Post} from 'utils/types/Post';

import {
  Locaiton,
  Calendar,
  Expand,
  Albums,
  Phone,
  Share as ShareIcon,
} from 'assets/images';
import {ImageAutoHeight} from 'components/atoms/ImageAutoHeight';
import {screenWidth} from 'utils/helpers';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.PROFILE_SLIDE_VIEW
>;

export const ProfileSlideView: React.FC<Props> = ({navigation, route}) => {
  const {user, initialIndex} = route.params;

  const [bottomSheetType, setBottomSheetType] =
    useState<BottomSheetType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const auth = useAuth();
  const posts = usePosts();

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

  const lovePost = (post: Post) => {
    if (post.loves.some(id => id === auth.user?.id)) {
      posts.setLoving('unlove', post.id);
    } else {
      posts.setLoving('love', post.id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[10px] py-[12px] flex-row items-center justify-between border-b border-grayDark">
        <Text className=" font-robotoMedium text-[16px] color-white">
          {user.username}
        </Text>

        <View className="flex-row items-center gap-[24px]">
          <If condition={user.id === auth.user?.id}>
            <Pressable
              onPress={() => setBottomSheetType(BottomSheetType.ALBUMS_MENU)}>
              <Albums />
            </Pressable>
          </If>
          <Pressable onPress={() => navigation.goBack()}>
            <Expand />
          </Pressable>
        </View>
      </View>

      <Swiper
        loop={false}
        showsPagination={false}
        index={currentIndex}
        onIndexChanged={setCurrentIndex}>
        {posts.getUserPosts(user.id).map(post => (
          <ScrollView showsVerticalScrollIndicator={false} key={post.id}>
            <View className="gap-[16px]">
              <ImageAutoHeight
                uri={post.imageLink}
                width={screenWidth}
                className="mt-[100px]"
              />

              <View className="px-[6px] flex-row items-center justify-between">
                <View className="flex-row items-center gap-[8px]">
                  <LikeButton
                    isLiked={post.loves.some(id => id === auth.user?.id)}
                    onPress={() => lovePost(post)}
                  />
                  <Text className="font-robotoMedium color-white">
                    {post.loves.length}
                  </Text>
                </View>

                <Pressable
                  onPress={onShare}
                  className="flex-row gap-[24px] items-center">
                  <ShareIcon />
                </Pressable>
              </View>

              <View className="flex-row px-[6px]">
                <Text className="font-robotoRegular color-white">
                  {post.title}
                </Text>
              </View>

              <View className="px-[6px] gap-[10px] mt-[8px]">
                <View className="flex-row items-center">
                  <Locaiton />
                  <Text className="font-robotoRegular color-grayMedium text-[12px]">
                    Singapore
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Calendar />
                  <Text className="font-robotoRegular color-grayMedium text-[12px]">
                    12 February 2024, 12:04 pm
                  </Text>
                </View>

                <If condition={!!post.deviceInfo}>
                  <View className="flex-row items-center">
                    <Phone />
                    <Text className="font-robotoRegular color-grayMedium text-[12px]">
                      {post.deviceInfo}
                    </Text>
                  </View>
                </If>
              </View>
            </View>
          </ScrollView>
        ))}
      </Swiper>

      <If condition={bottomSheetType !== null}>
        <View className="absolute bottom-0 top-0 right-0 left-0">
          <CustomBottomSheet
            snapPoints={['50%%']}
            onClose={() => setBottomSheetType(null)}>
            <If condition={bottomSheetType === BottomSheetType.ALBUMS_MENU}>
              <AlbumsMenu
                imageId={posts.getUserPosts(user.id)[currentIndex].id}
                close={() => setBottomSheetType(null)}
              />
            </If>
          </CustomBottomSheet>
        </View>
      </If>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
