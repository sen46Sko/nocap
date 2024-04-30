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

import {CustomBottomSheet} from 'components/organisms/CustomBottomSheet';
import {SubmittedReport} from 'components/organisms/bottomSheetScreens/SubmittedReport';
import {LikeButton} from 'components/atoms/buttons/LikeButton';
import {ReportMenu} from 'components/organisms/bottomSheetScreens/ReportMenu';
import {If} from 'components/atoms/If';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {BottomSheetType} from 'utils/types/BottomSheetType';

import {
  Albums,
  Calendar,
  Expand,
  Locaiton,
  MenuGray,
  Phone,
  Share,
} from 'assets/images';
import {ProfileMenu} from 'components/organisms/bottomSheetScreens/ProfileMenu';
import Swiper from 'react-native-swiper';
import {MyPhotoMenu} from 'components/organisms/bottomSheetScreens/MyPhotoMenu';
import {AlbumsMenu} from 'components/organisms/bottomSheetScreens/AlbumsMenu';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.PROFILE_SLIDE_VIEW
>;

export const ProfileSlideView: React.FC<Props> = ({navigation, route}) => {
  const {type: screenType} = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [bottomSheetType, setBottomSheetType] =
    useState<BottomSheetType | null>(null);
  console.log('🚀 ~ bottomSheetType:', bottomSheetType);

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

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[10px] flex-row items-center justify-between">
        <Text className=" font-robotoMedium text-[16px] color-white">Name</Text>

        <View className="flex-row items-center gap-[24px]">
          <If condition={screenType === 'my'}>
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

      <Swiper loop={false} showsPagination={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-[16px]">
            <Image
              source={{
                uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
              }}
              className="w-full h-[390px] mt-[100px]"
            />

            <View className="px-[6px] flex-row items-center justify-between">
              <View className="flex-row items-center gap-[8px]">
                <LikeButton
                  isLiked={isLiked}
                  onPress={() => setIsLiked(current => !current)}
                />
                <Text className="font-robotoMedium color-white">1,310</Text>
              </View>

              <View className="flex-row gap-[24px] items-center">
                <Share />

                <Pressable
                  onPress={() =>
                    setBottomSheetType(
                      screenType === 'my'
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
                Girls pose at Maintown
              </Text>
              <Text className="font-robotoRegular color-grayMedium">
                ...more
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-[16px]">
            <Image
              source={{
                uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
              }}
              className="w-full h-[390px] mt-[100px]"
            />

            <View className="px-[6px] flex-row items-center justify-between">
              <View className="flex-row items-center gap-[8px]">
                <LikeButton
                  isLiked={isLiked}
                  onPress={() => setIsLiked(current => !current)}
                />
                <Text className="font-robotoMedium color-white">1,310</Text>
              </View>

              <View className="flex-row gap-[24px] items-center">
                <Share />

                <Pressable
                  onPress={() =>
                    setBottomSheetType(
                      screenType === 'my'
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
                Girls pose at Maintown
              </Text>
              <Text className="font-robotoRegular color-grayMedium">
                ...more
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
