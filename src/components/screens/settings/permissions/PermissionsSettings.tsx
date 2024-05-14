import {SafeAreaView, StyleSheet, Pressable, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  checkNotifications,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CheckOrange, CrossOrange, Expand} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.PERMISSIONS_SETTINGS
>;

export const PermissionsSettings: React.FC<Props> = ({navigation}) => {
  const [permissions, setPermissions] = useState({
    camera: 'denied',
    contacts: 'denied,',
    location: 'denied,',
    microphone: 'denied,',
    notifications: 'denied,',
  });

  useEffect(() => {
    checkMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.CONTACTS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      PERMISSIONS.IOS.MICROPHONE,
    ]).then(res =>
      setPermissions(current => ({
        ...current,
        camera: res['ios.permission.CAMERA'],
        contacts: res['ios.permission.CONTACTS'],
        location: res['ios.permission.LOCATION_WHEN_IN_USE'],
        microphone: res['ios.permission.MICROPHONE'],
      })),
    );

    checkNotifications().then(res =>
      setPermissions(current => ({...current, notifications: res.status})),
    );
  }, []);

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
              isAllowed: permissions.camera === 'granted',
              permission: 'Camera',
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
              isAllowed: permissions.contacts === 'granted',
              permission: 'Contacts',
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
              isAllowed: permissions.location === 'granted',
              permission: 'Location',
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
              isAllowed: permissions.microphone === 'granted',
              permission: 'Microphone',
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
              isAllowed: permissions.notifications === 'granted',
              permission: 'Notifications',
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
