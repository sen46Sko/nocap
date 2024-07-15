import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import {CustomBottomSheet} from 'components/organisms/CustomBottomSheet';
import {NotificaitonsMenu} from 'components/organisms/bottomSheetScreens/NotificationsMenu';
import {SubmittedReport} from 'components/organisms/bottomSheetScreens/SubmittedReport';
import {MyProfileMenu} from 'components/organisms/bottomSheetScreens/MyProfileMenu';
import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {ProfileMenu} from 'components/organisms/bottomSheetScreens/ProfileMenu';
import {ReportMenu} from 'components/organisms/bottomSheetScreens/ReportMenu';
import {If} from 'components/atoms/If';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {getPeepers, getUserIfExists} from 'api/users';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {BottomSheetType} from 'utils/types/BottomSheetType';
import {User} from 'utils/types/User';

import {
  Notifications,
  MenuOrange,
  SwipeArrow,
  LogoBlack,
  EyeGray,
  Expand,
} from 'assets/images';
import {screenWidth} from 'utils/helpers';
import FastImage from 'react-native-fast-image';
import {useIsFocused} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, Screens.PROFILE>;

export const Profile: React.FC<Props> = ({navigation, route}) => {
  const {userId} = route.params;

  const [isPeeping, setIsPeeping] = useState(false);
  const [bottomSheetType, setBottomSheetType] =
    useState<BottomSheetType | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [peepersCount, setPeepersCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const auth = useAuth();
  const posts = usePosts();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserIfExists(userId).then(setUser);
      getPeepers(userId).then(res => setPeepersCount(res.length));
    }
  }, [userId, isFocused]);

  useEffect(() => {
    if (auth.user?.peeps.some(id => id === userId)) {
      setIsPeeping(true);
    } else {
      setIsPeeping(false);
    }
  }, [auth.user?.peeps, userId]);

  const peepUser = () => {
    if (isPeeping) {
      auth.setPeeping('unpeep', userId);
      setIsPeeping(false);
    } else {
      auth.setPeeping('peep', userId);
      setIsPeeping(true);
    }
  };

  const getSnapPoints = () => {
    switch (bottomSheetType) {
      default:
      case BottomSheetType.PROFILE_MENU:
      case BottomSheetType.REPORT_SMTH_ELSE:
        return ['50%'];
      case BottomSheetType.REPORT_MENU:
        return ['90%'];
      case BottomSheetType.SUBMITTED_REPORT:
        return ['30%'];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="bg-black flex-1">
        <View className="px-[10px] py-[16px] flex-row justify-center items-center border-b border-grayDark">
          <Pressable onPress={() => navigation.goBack()}>
            <Expand />
          </Pressable>

          <If condition={currentPage === 1}>
            <Pressable
              className="absolute right-[8px]"
              onPress={() =>
                userId === auth.user?.id
                  ? navigation.navigate(Screens.NOTIFICATIONS)
                  : setBottomSheetType(BottomSheetType.NOTIFICTIONS_MENU)
              }>
              <Notifications />
            </Pressable>
          </If>
        </View>

        <PagerView
          orientation="vertical"
          useNext
          scrollEnabled
          onPageSelected={e => setCurrentPage(e.nativeEvent.position)}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {user?.imageLink ? (
                <FastImage
                  source={{
                    uri: user.imageLink,
                  }}
                  style={styles.profileImage}
                />
              ) : (
                <Pressable
                  onPress={() =>
                    navigation.navigate(Screens.PROFILE_PHOTO_CAMERA)
                  }
                  style={styles.profileImage}
                  className="bg-[#161515] items-center justify-center">
                  <LogoBlack />
                  <Text className="font-robotoMedium text-[16px] color-white">
                    Tap to capture profile picture
                  </Text>
                </Pressable>
              )}

              <View className="px-[16px]">
                <View className="flex-row justify-between mt-[16px]">
                  <Text className="font-robotoMedium text-[24px] color-white">
                    {user?.username || ''}
                  </Text>

                  <View className="flex-row items-center gap-[8px]">
                    <If condition={userId !== auth.user?.id}>
                      <SmallButton
                        onPress={peepUser}
                        {...(!isPeeping && {label: 'Peep'})}
                        {...(isPeeping && {Icon: EyeGray})}
                      />
                    </If>

                    <Pressable
                      onPress={() =>
                        setBottomSheetType(BottomSheetType.PROFILE_MENU)
                      }>
                      <MenuOrange />
                    </Pressable>
                  </View>
                </View>

                <Text className="font-robotoRegular text-[16px] color-grayLight mt-[8px]">
                  {user?.bio || ''}
                </Text>

                <View className="flex-row items-center justify-between pr-[20px]">
                  <View>
                    <If
                      condition={
                        userId === auth.user?.id && !!auth.user.albums.length
                      }>
                      <Text className="font-robotoMedium color-white mt-[46px]">
                        Albums
                      </Text>

                      <View className="flex-row gap-[10px] mt-[16px]">
                        {user?.albums.map(album => (
                          <View
                            className="border border-grayDark rounded-[24px] p-[10px]"
                            key={album.id}>
                            <Text className="font-robotoMedium color-white">
                              {album.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </If>

                    <Text className="font-robotoRegular color-grayMedium mt-[16px]">
                      Member since 2024
                    </Text>
                  </View>
                  <View>
                    <SwipeArrow />
                    <Text className="font-robotoMedium text-[16px] color-white">
                      profile
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="px-[16px]">
              <View className="flex-row justify-between items-start mt-[16px]">
                <View className="flex-row gap-[16px] items-center">
                  <FastImage
                    source={{
                      uri: user?.imageLink || '',
                    }}
                    style={styles.avatar}
                  />

                  <View className="gap-[16px]">
                    <Text className="font-robotoMedium text-[20px] color-white">
                      {user?.username || ''}
                    </Text>
                    <Pressable
                      onPress={() =>
                        navigation.navigate(Screens.PEEPERS, {userId})
                      }>
                      <Text className="font-robotoBold text-[16px] color-orange">
                        {`${peepersCount} Peepers`}
                      </Text>
                    </Pressable>
                    <Text className="font-robotoRegular color-grayLight">
                      {user?.bio || ''}
                    </Text>
                  </View>
                </View>

                <If condition={userId !== auth.user?.id}>
                  <SmallButton
                    onPress={peepUser}
                    {...(!isPeeping && {label: 'Peep'})}
                    {...(isPeeping && {Icon: EyeGray})}
                  />
                </If>

                <If condition={userId === auth.user?.id}>
                  <Pressable
                    onPress={() => {
                      navigation.goBack();
                      navigation.navigate(Screens.SETTINGS);
                    }}>
                    <MenuOrange />
                  </Pressable>
                </If>
              </View>

              <View className="items-center">
                <View style={styles.photosContainer}>
                  {posts.getUserPosts(userId).map((post, index) => (
                    <Pressable
                      key={post.id}
                      onPress={() =>
                        navigation.navigate(Screens.PROFILE_SLIDE_VIEW, {
                          user: user!,
                          initialIndex: index,
                        })
                      }>
                      <FastImage
                        source={{
                          uri: post.imageLink,
                        }}
                        style={styles.image}
                      />
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </PagerView>
      </View>

      <If condition={bottomSheetType !== null}>
        <View className="absolute bottom-0 top-0 right-0 left-0">
          <CustomBottomSheet
            snapPoints={getSnapPoints()}
            onClose={() => setBottomSheetType(null)}>
            <If condition={bottomSheetType === BottomSheetType.PROFILE_MENU}>
              {userId === auth.user?.id ? (
                <MyProfileMenu />
              ) : (
                <ProfileMenu
                  onReport={() =>
                    setBottomSheetType(BottomSheetType.REPORT_MENU)
                  }
                />
              )}
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

            <If
              condition={bottomSheetType === BottomSheetType.NOTIFICTIONS_MENU}>
              <NotificaitonsMenu />
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#161515',
  },
  profileImage: {
    width: screenWidth,
    height: (screenWidth / 3) * 4,
    backgroundColor: '#161515',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 4,
  },
  photosContainer: {
    width: 375,
    gap: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 40,
    paddingBottom: 60,
  },
});
