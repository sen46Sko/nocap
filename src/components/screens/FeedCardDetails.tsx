import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {Calendar, Locaiton, Menu, Phone, Share} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.FEED_CARD_DETAILS
>;

export const FeedCardDetails: React.FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-[16px]">
          <View className="px-[10px] py-[16px]">
            <Text className=" font-robotoMedium color-grayMedium text-[24px]">
              nocap
            </Text>
          </View>

          <View className="px-[10px]">
            <Text className=" font-robotoBold color-white text-[16px]">
              Name
            </Text>
          </View>

          <Image
            source={{
              uri: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
            }}
            className="w-full h-[516px]"
          />

          <View className="px-[6px] flex-row items-center justify-between">
            <View className="flex-row items-center gap-[8px]">
              <View className="bg-grayDark h-[32px] w-[32px] rounded-full items-center justify-center">
                <Text className="text-[20px]">😍</Text>
              </View>
              <Text className="font-robotoMedium color-white">1,310</Text>
            </View>

            <View className="flex-row gap-[24px] items-center">
              <Share />
              <Menu />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
