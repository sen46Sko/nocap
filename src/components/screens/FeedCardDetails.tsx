import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Share,
  Alert,
  Text,
  View,
} from 'react-native';

import {CustomBottomSheet} from 'components/organisms/CustomBottomSheet';
import {SubmittedReport} from 'components/organisms/bottomSheetScreens/SubmittedReport';
import {FadeScaleAnim} from 'components/atoms/FadeScaleAnim';
import {FeedCardMenu} from 'components/organisms/bottomSheetScreens/FeedCardMenu';
import {LikeButton} from 'components/atoms/buttons/LikeButton';
import {ReportMenu} from 'components/organisms/bottomSheetScreens/ReportMenu';
import {If} from 'components/atoms/If';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {getUserIfExists} from 'api/users';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {BottomSheetType} from 'utils/types/BottomSheetType';
import {Post} from 'utils/types/Post';

import {
  Calendar,
  Locaiton,
  MenuGray,
  Phone,
  Share as ShareIcon,
  Eye,
} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.FEED_CARD_DETAILS
>;

export const FeedCardDetails: React.FC<Props> = ({navigation, route}) => {
  const {postId} = route.params;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoving, setIsLoving] = useState(false);
  const [bottomSheetType, setBottomSheetType] =
    useState<BottomSheetType | null>(null);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [userName, setUserName] = useState('');

  const auth = useAuth();
  const posts = usePosts();

  useEffect(() => {
    setPost(posts.posts.find(foundPost => foundPost.id === postId) || null);
  }, [postId, posts.posts]);

  useEffect(() => {
    if (!post || userName) {
      return;
    }

    getUserIfExists(post.userId).then(res => setUserName(res?.username || ''));
  }, [post, userName]);

  useEffect(() => {
    if (post?.loves.some(id => id === auth.user?.id)) {
      setIsLoving(true);
    } else {
      setIsLoving(false);
    }
  }, [auth.user?.id, post, post?.loves]);

  const lovePost = () => {
    if (isLoving) {
      posts.setLoving('unlove', post!.id);
      setIsLoving(false);
    } else {
      posts.setLoving('love', post!.id);
      setIsLoving(true);
    }
  };

  const getSnapPoints = () => {
    switch (bottomSheetType) {
      default:
      case BottomSheetType.FEED_CARD_MENU:
      case BottomSheetType.REPORT_SMTH_ELSE:
        return ['50%'];
      case BottomSheetType.REPORT_MENU:
        return ['80%'];
      case BottomSheetType.SUBMITTED_REPORT:
        return ['30%'];
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FadeScaleAnim isStarted={isPhotoLoaded}>
          <View className="gap-[16px]">
            <View className="px-[10px] py-[16px]">
              <Text className=" font-robotoMedium color-grayMedium text-[24px]">
                nocap
              </Text>
            </View>

            <View className="px-[10px] flex-row items-center justify-between">
              <Pressable
                onPress={() =>
                  navigation.navigate(Screens.PROFILE, {userId: post!.userId})
                }>
                <Text className=" font-robotoBold color-white text-[16px]">
                  {userName}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  setBottomSheetType(BottomSheetType.FEED_CARD_MENU)
                }>
                <MenuGray />
              </Pressable>
            </View>

            <If condition={!!post?.imageLink}>
              <Image
                source={{
                  uri: post?.imageLink || '',
                }}
                className="w-full h-[516px]"
                onLoad={() => setIsPhotoLoaded(true)}
              />
            </If>

            <View className="px-[6px] flex-row items-center justify-between">
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

            <View className="flex-row px-[6px]">
              <Text className="font-robotoRegular color-white">
                {post?.title || ''}
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
        </FadeScaleAnim>
      </ScrollView>

      <If condition={bottomSheetType !== null}>
        <View className="absolute bottom-0 top-0 right-0 left-0">
          <CustomBottomSheet
            snapPoints={getSnapPoints()}
            onClose={() => setBottomSheetType(null)}>
            <If condition={bottomSheetType === BottomSheetType.FEED_CARD_MENU}>
              <FeedCardMenu
                onReport={() => setBottomSheetType(BottomSheetType.REPORT_MENU)}
              />
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
