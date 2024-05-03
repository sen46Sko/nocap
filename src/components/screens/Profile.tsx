import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
import {NotificaitonsMenu} from 'components/organisms/bottomSheetScreens/NotificationsMenu';
import {SubmittedReport} from 'components/organisms/bottomSheetScreens/SubmittedReport';
import {MyProfileMenu} from 'components/organisms/bottomSheetScreens/MyProfileMenu';
import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {ProfileMenu} from 'components/organisms/bottomSheetScreens/ProfileMenu';
import {ReportMenu} from 'components/organisms/bottomSheetScreens/ReportMenu';
import {If} from 'components/atoms/If';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {BottomSheetType} from 'utils/types/BottomSheetType';

import {Expand, MenuOrange, Notifications} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.PROFILE>;

export const Profile: React.FC<Props> = ({navigation, route}) => {
  const {userId} = route.params;

  const [isPeeping, setIsPeeping] = useState(false);
  const [bottomSheetType, setBottomSheetType] =
    useState<BottomSheetType | null>(null);

  const auth = useAuth();

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

          <Pressable
            className="absolute right-[8px]"
            onPress={() =>
              userId === auth.user?.id
                ? navigation.navigate(Screens.NOTIFICATIONS)
                : setBottomSheetType(BottomSheetType.NOTIFICTIONS_MENU)
            }>
            <Notifications />
          </Pressable>
        </View>

        <Swiper horizontal={false} loop={false} showsPagination={false}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
                }}
                className="w-full h-[464px]"
              />

              <View className="px-[16px]">
                <View className="flex-row justify-between mt-[16px]">
                  <Text className="font-robotoMedium text-[24px] color-white">
                    Streetdog
                  </Text>

                  <View className="flex-row items-center gap-[8px]">
                    <If condition={userId !== auth.user?.id}>
                      <SmallButton
                        label={isPeeping ? 'Peeping' : 'Peep'}
                        onPress={peepUser}
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
                  Street style wears
                </Text>

                <If condition={userId === auth.user?.id}>
                  <Text className="font-robotoMedium color-white mt-[46px]">
                    Albums
                  </Text>

                  <View className="flex-row gap-[10px] mt-[16px]">
                    <View className="border border-grayDark rounded-[24px] p-[10px]">
                      <Text className="font-robotoMedium color-white">Sky</Text>
                    </View>

                    <View className="border border-grayDark rounded-[24px] p-[10px]">
                      <Text className="font-robotoMedium color-white">
                        Dogs
                      </Text>
                    </View>

                    <View className="border border-grayDark rounded-[24px] p-[10px]">
                      <Text className="font-robotoMedium color-white">
                        Sneakers
                      </Text>
                    </View>

                    <View className="border border-grayDark rounded-[24px] p-[10px]">
                      <Text className="font-robotoMedium color-white">
                        Food
                      </Text>
                    </View>

                    <View className="border border-grayDark rounded-[24px] p-[10px]">
                      <Text className="font-robotoMedium color-white">
                        Portraits
                      </Text>
                    </View>
                  </View>
                </If>

                <Text className="font-robotoRegular color-grayMedium mt-[18px]">
                  Member since 2024
                </Text>
              </View>
            </View>
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="px-[16px]">
              <View className="flex-row justify-between items-start mt-[16px]">
                <View className="flex-row gap-[16px] items-center">
                  <View className="h-[100px] w-[100px] rounded-full bg-grayMedium" />
                  <View className="gap-[16px]">
                    <Text className="font-robotoMedium text-[20px] color-white">
                      Street Dog
                    </Text>
                    <Pressable
                      onPress={() => navigation.navigate(Screens.PEEPERS)}>
                      <Text className="font-robotoBold text-[16px] color-orange">
                        25 Peepers
                      </Text>
                    </Pressable>
                    <Text className="font-robotoRegular color-grayLight">
                      Clothing
                    </Text>
                  </View>
                </View>

                <If condition={userId !== auth.user?.id}>
                  <SmallButton
                    label={isPeeping ? 'Peeping' : 'Peep'}
                    onPress={peepUser}
                  />
                </If>

                <If condition={userId === auth.user?.id}>
                  <Pressable
                    onPress={() =>
                      setBottomSheetType(BottomSheetType.PROFILE_MENU)
                    }>
                    <MenuOrange />
                  </Pressable>
                </If>
              </View>

              <View className="flex-row gap-[4px] flex-wrap mt-[40px] pb-[60px]">
                <Pressable
                  onPress={() =>
                    navigation.navigate(Screens.PROFILE_SLIDE_VIEW, {
                      type: userId === auth.user?.id ? 'my' : 'not my',
                    })
                  }>
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[116px] h-[116px] rounded-[4px]"
                  />
                </Pressable>

                <Pressable
                  onPress={() =>
                    navigation.navigate(Screens.PROFILE_SLIDE_VIEW, {
                      type: userId === auth.user?.id ? 'my' : 'not my',
                    })
                  }>
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[116px] h-[116px] rounded-[4px]"
                  />
                </Pressable>

                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[116px] h-[116px] rounded-[4px]"
                />
              </View>
            </View>
          </ScrollView>
        </Swiper>
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
});
