import {SafeAreaView, StyleSheet, Pressable, View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {usePermissions} from 'contexts/PermissionsContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CheckOrange, CrossOrange, Expand} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.PERMISSIONS_SETTINGS
>;

export const PermissionsSettings: React.FC<Props> = ({navigation}) => {
  const permissions = usePermissions();

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[16px] py-[12px] flex-row justify-between items-center border-b border-grayDark">
        <Pressable onPress={navigation.goBack}>
          <CrossOrange />
        </Pressable>
        <Pressable onPress={navigation.goBack}>
          <CheckOrange />
        </Pressable>
      </View>

      <View className="mt-[26px] gap-[26px] px-[16px]">
        <Pressable
          className="flex-row items-center justify-between"
          onPress={() =>
            navigation.navigate(Screens.PERMISSION_DETAILS, {
              permissionName: 'Camera',
            })
          }>
          <Text className="font-robotoRegular text-[16px] color-white">
            Camera
          </Text>
          <View className="flex-row items-center gap-[8px]">
            <Text className="font-robotoRegular text-[16px] color-grayMedium">
              {permissions.camera === 'granted' ? 'Allowed' : 'Not Allowed'}
            </Text>
            <View className="rotate-[-90deg]">
              <Expand />
            </View>
          </View>
        </Pressable>

        <Pressable
          className="flex-row items-center justify-between"
          onPress={() =>
            navigation.navigate(Screens.PERMISSION_DETAILS, {
              permissionName: 'Contacts',
            })
          }>
          <Text className="font-robotoRegular text-[16px] color-white">
            Contacts
          </Text>
          <View className="flex-row items-center gap-[8px]">
            <Text className="font-robotoRegular text-[16px] color-grayMedium">
              {permissions.contacts === 'granted' ? 'Allowed' : 'Not Allowed'}
            </Text>
            <Pressable className=" rotate-[-90deg]">
              <Expand />
            </Pressable>
          </View>
        </Pressable>

        <Pressable
          className="flex-row items-center justify-between"
          onPress={() =>
            navigation.navigate(Screens.PERMISSION_DETAILS, {
              permissionName: 'Location',
            })
          }>
          <Text className="font-robotoRegular text-[16px] color-white">
            Location services
          </Text>
          <View className="flex-row items-center gap-[8px]">
            <Text className="font-robotoRegular text-[16px] color-grayMedium">
              {permissions.location === 'granted' ? 'Allowed' : 'Not Allowed'}
            </Text>
            <Pressable className=" rotate-[-90deg]">
              <Expand />
            </Pressable>
          </View>
        </Pressable>

        <Pressable
          className="flex-row items-center justify-between"
          onPress={() =>
            navigation.navigate(Screens.PERMISSION_DETAILS, {
              permissionName: 'Microphone',
            })
          }>
          <Text className="font-robotoRegular text-[16px] color-white">
            Microphone
          </Text>
          <View className="flex-row items-center gap-[8px]">
            <Text className="font-robotoRegular text-[16px] color-grayMedium">
              {permissions.microphone === 'granted' ? 'Allowed' : 'Not Allowed'}
            </Text>
            <Pressable className=" rotate-[-90deg]">
              <Expand />
            </Pressable>
          </View>
        </Pressable>

        <Pressable
          className="flex-row items-center justify-between"
          onPress={() =>
            navigation.navigate(Screens.PERMISSION_DETAILS, {
              permissionName: 'Notifications',
            })
          }>
          <Text className="font-robotoRegular text-[16px] color-white">
            Notifications
          </Text>
          <View className="flex-row items-center gap-[8px]">
            <Text className="font-robotoRegular text-[16px] color-grayMedium">
              {permissions.notifications === 'granted'
                ? 'Allowed'
                : 'Not Allowed'}
            </Text>
            <Pressable className=" rotate-[-90deg]">
              <Expand />
            </Pressable>
          </View>
        </Pressable>
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
