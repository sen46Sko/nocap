import {SafeAreaView, StyleSheet, Pressable, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand} from 'assets/images';
import {SmallButton} from 'components/atoms/buttons/SmallButton';

type Props = NativeStackScreenProps<RootStackParamList, Screens.NOTIFICATIONS>;

export const Notifications: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[16px] py-[12px] flex-row items-center justify-between border-b border-grayDark">
        <Text className=" font-robotoMedium text-[16px] color-white">
          Notifications
        </Text>

        <Pressable onPress={() => navigation.goBack()}>
          <Expand />
        </Pressable>
      </View>
      <View className="gap-[16px] p-[16px]">
        <Text className=" font-robotoMedium text-[16px] color-white">
          Today
        </Text>

        <View className="flex-row items-center gap-[8px]">
          <View className="h-[40px] w-[40px] rounded-full bg-grayLight" />

          <View className="shrink">
            <Text className="font-robotoRegular color-white shrink">
              Shantanu posted a picture you might like: R8 Audi 😎 3h
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-[8px]  items-center">
            <View className="h-[40px] w-[40px] rounded-full bg-grayLight" />

            <View className="shrink">
              <Text className="font-robotoRegular color-white shrink">
                Dravid liked your onspot: Burgeer! 12h
              </Text>
            </View>
          </View>

          <View className="h-[40px] w-[40px] rounded-[4px] bg-grayLight" />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-[8px]  items-center">
            <View className="h-[40px] w-[40px] rounded-full bg-grayLight" />

            <View className="shrink">
              <Text className="font-robotoRegular color-white shrink">
                Bonda started peeping you 16h
              </Text>
            </View>
          </View>

          <SmallButton label="Peep" onPress={() => {}} />
        </View>

        <View className="flex-row items-center gap-[8px] justify-between shrink">
          <View className="flex-row gap-[8px]  items-center shrink">
            <View className="h-[40px] w-[40px] rounded-full bg-grayLight" />

            <View className="shrink">
              <Text className="font-robotoRegular color-white shrink">
                Deepak from your contact just created a account, would you peep
                first? 17h
              </Text>
            </View>
          </View>

          <SmallButton label="Peep" onPress={() => {}} />
        </View>

        <Text className=" font-robotoMedium text-[16px] color-white">
          Last 7 days
        </Text>

        <View className="flex-row items-center gap-[8px] justify-between shrink">
          <View className="flex-row gap-[8px]  items-center shrink">
            <View className="h-[40px] w-[40px] rounded-full bg-grayLight" />

            <View className="shrink">
              <Text className="font-robotoRegular color-white shrink">
                Ashok from your contact just created a account, would you peep
                first? 3d
              </Text>
            </View>
          </View>

          <SmallButton label="Peep" onPress={() => {}} />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-[8px]  items-center">
            <View className="h-[40px] w-[40px] rounded-full bg-grayLight" />

            <View className="shrink">
              <Text className="font-robotoRegular color-white shrink">
                Dravid liked your post: view. 4d
              </Text>
            </View>
          </View>

          <View className="h-[40px] w-[40px] rounded-[4px] bg-grayLight" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
