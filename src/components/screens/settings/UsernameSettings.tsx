import {SafeAreaView, StyleSheet, Pressable, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CheckOrange, CrossOrange} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.USERNAME_SETTINGS
>;

export const UsernameSettings: React.FC<Props> = ({navigation}) => {
  const auth = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[16px] py-[12px] flex-row justify-between items-center border-b border-grayDark">
        <Pressable onPress={() => navigation.goBack()}>
          <CrossOrange />
        </Pressable>
        <Pressable onPress={() => navigation.goBack()}>
          <CheckOrange />
        </Pressable>
      </View>

      <View className="px-[16px] gap-[24px] mt-[24px]">
        <View className="gap-[8px]">
          <Text className="font-robotoRegular text-[16px] color-grayLight">
            Name
          </Text>
          <Text className="font-robotoMedium text-[16px] color-white">
            {auth.user?.username}
          </Text>
        </View>

        <View className="w-full h-[1px] bg-grayDark" />

        <View className="gap-[8px]">
          <Text className="font-robotoRegular text-[16px] color-grayLight">
            Enter new name
          </Text>
          <Text className="font-robotoMedium text-[16px] color-white">
            {auth.user?.username}
          </Text>
        </View>

        <View className="w-full h-[1px] bg-grayDark" />
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
