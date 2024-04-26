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
import {FeedCardMenu} from 'components/organisms/bottomSheetScreens/FeedCardMenu';
import {LikeButton} from 'components/atoms/buttons/LikeButton';
import {If} from 'components/atoms/If';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {BottomSheetType} from 'utils/types/BottomSheetType';

import {Calendar, Eye, Locaiton, Menu, Phone, Share} from 'assets/images';
import {ReportMenu} from 'components/organisms/bottomSheetScreens/ReportMenu';
import {SubmittedReport} from 'components/organisms/bottomSheetScreens/SubmittedReport';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.FEED_CARD_DETAILS
>;

export const FeedCardDetails: React.FC<Props> = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [bottomSheetType, setBottomSheetType] =
    useState<BottomSheetType | null>(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-[16px]">
          <View className="px-[10px] py-[16px]">
            <Text className=" font-robotoMedium color-grayMedium text-[24px]">
              nocap
            </Text>
          </View>

          <View className="px-[10px] flex-row items-center justify-between">
            <Text className=" font-robotoBold color-white text-[16px]">
              Name
            </Text>
            <Pressable
              onPress={() =>
                setBottomSheetType(BottomSheetType.FEED_CARD_MENU)
              }>
              <Menu />
            </Pressable>
          </View>

          <Image
            source={{
              uri: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
            }}
            className="w-full h-[516px]"
          />

          <View className="px-[6px] flex-row items-center justify-between">
            <View className="flex-row items-center gap-[8px]">
              <LikeButton
                isLiked={isLiked}
                onPress={() => setIsLiked(current => !current)}
              />
              <Text className="font-robotoMedium color-white">1,310 Loves</Text>
            </View>

            <View className="flex-row gap-[24px] items-center">
              <View className="flex-row gap-[4px]">
                <Eye />
                <Text className="font-robotoMedium color-white">6K+</Text>
              </View>
              <Share />
            </View>
          </View>

          <View className="flex-row px-[6px]">
            <Text className="font-robotoRegular color-white">
              Girls pose at Maintown
            </Text>
            <Text className="font-robotoRegular color-grayMedium">...more</Text>
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
