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
import {Menu, Share} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.FEED_CARD_DETAILS
>;

export const FeedCardDetails: React.FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="px-[10px] py-[16px]">
            <Text className=" font-robotoMedium color-grayMedium text-[24px]">
              nocap
            </Text>
          </View>

          <View className="px-[10px] py-[14px]">
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

          <View className="p-[16px] flex-row items-center justify-between">
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
