import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {CustomBottomSheet} from 'components/organisms/CustomBottomSheet';
import {SubmittedReport} from 'components/organisms/bottomSheetScreens/SubmittedReport';
import {ProfileMenu} from 'components/organisms/bottomSheetScreens/ProfileMenu';
import {MyPhotoMenu} from 'components/organisms/bottomSheetScreens/MyPhotoMenu';
import {AlbumsMenu} from 'components/organisms/bottomSheetScreens/AlbumsMenu';
import {LikeButton} from 'components/atoms/buttons/LikeButton';
import {ReportMenu} from 'components/organisms/bottomSheetScreens/ReportMenu';
import {If} from 'components/atoms/If';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {BottomSheetType} from 'utils/types/BottomSheetType';

import {
  Locaiton,
  Calendar,
  MenuGray,
  Expand,
  Albums,
  Phone,
  Share,
} from 'assets/images';
import {Post} from 'utils/types/Post';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.PROFILE_SLIDE_VIEW
>;

export const ProfileSlideView: React.FC<Props> = ({navigation, route}) => {
  const {user, currentIndex} = route.params;

  const [bottomSheetType, setBottomSheetType] =
    useState<BottomSheetType | null>(null);

  const auth = useAuth();
  const posts = usePosts();

  const getSnapPoints = () => {
    switch (bottomSheetType) {
      default:
        return ['50%'];
      case BottomSheetType.REPORT_MENU:
        return ['90%'];
      case BottomSheetType.SUBMITTED_REPORT:
        return ['30%'];
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

      <Swiper loop={false} showsPagination={false} index={currentIndex}>
        {posts.getUserPosts(user.id).map(post => (
          <ScrollView showsVerticalScrollIndicator={false} key={post.id}>
            <View className="gap-[16px]">
              <Image
                source={{
                  uri: post.imageLink,
                }}
                className="w-full h-[390px] mt-[100px]"
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

                <View className="flex-row gap-[24px] items-center">
                  <Share />

                  <Pressable
                    onPress={() =>
                      setBottomSheetType(
                        user.id === auth.user?.id
                          ? BottomSheetType.MY_PHOTO_MENU
                          : BottomSheetType.PROFILE_MENU,
                      )
                    }>
                    <MenuGray />
                  </Pressable>
                </View>
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

                <View className="flex-row items-center">
                  <Phone />
                  <Text className="font-robotoRegular color-grayMedium text-[12px]">
                    Phone 15 Pro Max
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        ))}
      </Swiper>

      <If condition={bottomSheetType !== null}>
        <View className="absolute bottom-0 top-0 right-0 left-0">
          <CustomBottomSheet
            snapPoints={getSnapPoints()}
            onClose={() => setBottomSheetType(null)}>
            <If condition={bottomSheetType === BottomSheetType.PROFILE_MENU}>
              <ProfileMenu
                onReport={() => setBottomSheetType(BottomSheetType.REPORT_MENU)}
              />
            </If>

            <If condition={bottomSheetType === BottomSheetType.MY_PHOTO_MENU}>
              <MyPhotoMenu />
            </If>

            <If condition={bottomSheetType === BottomSheetType.ALBUMS_MENU}>
              <AlbumsMenu />
            </If>

            <If
              condition={
                bottomSheetType === BottomSheetType.REPORT_MENU ||
                bottomSheetType === BottomSheetType.REPORT_SMTH_ELSE
              }>
              <ReportMenu
                isReportElse={
                  bottomSheetType === BottomSheetType.REPORT_SMTH_ELSE
                }
                onReportElse={() =>
                  setBottomSheetType(BottomSheetType.REPORT_SMTH_ELSE)
                }
                onSubmitReport={() =>
                  setBottomSheetType(BottomSheetType.SUBMITTED_REPORT)
                }
              />
            </If>

            <If
              condition={bottomSheetType === BottomSheetType.SUBMITTED_REPORT}>
              <SubmittedReport />
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
