import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ListRenderItemInfo,
  SafeAreaView,
  Pressable,
  ViewToken,
  FlatList,
  Text,
  View,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import FastImage from 'react-native-fast-image';

import {FeedCard} from 'components/organisms/FeedCard';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {Post} from 'utils/types/Post';

import {Plus, SearchWhite} from 'assets/images';
import {If} from 'components/atoms/If';
import {CustomBottomSheet} from 'components/organisms/CustomBottomSheet';
import {FeedCardMenu} from 'components/organisms/bottomSheetScreens/FeedCardMenu';
import {ReportMenu} from 'components/organisms/bottomSheetScreens/ReportMenu';
import {SubmittedReport} from 'components/organisms/bottomSheetScreens/SubmittedReport';
import {BottomSheetType} from 'utils/types/BottomSheetType';

type Props = NativeStackScreenProps<RootStackParamList, Screens.HOME>;

export const Home: React.FC<Props> = ({navigation}) => {
  const [bottomSheetType, setBottomSheetType] =
    useState<BottomSheetType | null>(null);

  const auth = useAuth();
  const posts = usePosts();

  const renderFeedCard = useCallback(
    ({item: post}: ListRenderItemInfo<Post>) => (
      <FeedCard
        key={post.id}
        post={post}
        openMenu={() => setBottomSheetType(BottomSheetType.FEED_CARD_MENU)}
        openProfile={() =>
          navigation.navigate(Screens.PROFILE, {userId: post.userId})
        }
      />
    ),
    [navigation],
  );

  const renderSeparator = useCallback(() => <View className="h-[24px]" />, []);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      for (const viewable of viewableItems) {
        posts.addView(viewable.item.id);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
    <View className="bg-black flex-1 gap-[13px]">
      <SafeAreaView>
        <View className="px-[10px] py-[16px] flex-row justify-between items-center">
          <Text className=" font-robotoMedium color-white text-[24px]">
            nocap
          </Text>

          <View className="flex-row items-center gap-[24px]">
            <Pressable onPress={() => navigation.navigate(Screens.SEARCH)}>
              <SearchWhite />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate(Screens.CAMERA_SCREEN)}>
              <Plus />
            </Pressable>

            <Pressable
              onPress={() =>
                navigation.navigate(Screens.PROFILE, {
                  userId: auth.user?.id || '',
                })
              }>
              <FastImage
                source={{uri: auth.user?.imageLink || ''}}
                style={styles.avatar}
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <FlatList
        data={posts.posts}
        renderItem={renderFeedCard}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
      />

      <If condition={bottomSheetType !== null}>
        <View className="absolute bottom-0 top-0 right-0 left-0">
          <CustomBottomSheet
            snapPoints={getSnapPoints()}
            onClose={() => setBottomSheetType(null)}>
            <If condition={bottomSheetType === BottomSheetType.FEED_CARD_MENU}>
              <FeedCardMenu
                onReport={() => setBottomSheetType(BottomSheetType.REPORT_MENU)}
                onShare={onShare}
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
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
});
