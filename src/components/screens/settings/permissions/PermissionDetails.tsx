import {SafeAreaView, StyleSheet, Pressable, View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {openSettings} from 'react-native-permissions';
import React, {useMemo} from 'react';

import {BigButton} from 'components/atoms/buttons/BigButton';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CheckOrange, Expand} from 'assets/images';
import {usePermissions} from 'contexts/PermissionsContext';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.PERMISSION_DETAILS
>;

export const PermissionDetails: React.FC<Props> = ({navigation, route}) => {
  const {permissionName} = route.params;

  const permissions = usePermissions();

  const isAllowed = useMemo(() => {
    switch (permissionName) {
      default:
      case 'Camera':
        return permissions.camera === 'granted';
      case 'Contacts':
        return permissions.contacts === 'granted';
      case 'Location':
        return permissions.location === 'granted';
      case 'Microphone':
        return permissions.microphone === 'granted';
      case 'Notifications':
        return permissions.notifications === 'granted';
    }
  }, [
    permissionName,
    permissions.camera,
    permissions.contacts,
    permissions.location,
    permissions.microphone,
    permissions.notifications,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[16px] py-[12px] flex-row justify-between items-center border-b border-grayDark">
        <View className="flex-row items-center gap-[16px]">
          <Pressable onPress={navigation.goBack} className="rotate-90">
            <Expand />
          </Pressable>

          <Text className="font-robotoMedium text-[16px] color-grayLight">
            {permissionName}
          </Text>
        </View>
        <Pressable onPress={navigation.goBack}>
          <CheckOrange />
        </Pressable>
      </View>

      <View className="px-[16px]">
        <Text className="font-robotoRegular text-[16px] color-grayLight mt-[16px]">{`${permissionName} permission to this device to this device is`}</Text>

        {isAllowed ? (
          <Text className="font-robotoRegular text-[16px] color-green mt-[16px]">
            Allowed
          </Text>
        ) : (
          <Text className="font-robotoRegular text-[16px] color-red mt-[16px]">
            Not allowed
          </Text>
        )}

        <Text className="font-robotoRegular color-grayMedium mt-[8px]">
          {`Nocap is${
            !isAllowed ? ' not' : ''
          } allowed to access this device's ${permissionName.toLowerCase()}.`}
        </Text>

        <Text className="font-robotoRegular text-[16px] color-grayLight mt-[24px]">
          Other option
        </Text>

        <Text className="font-robotoRegular text-[16px] color-white mt-[16px]">
          {!isAllowed ? 'Allowed' : 'Not allowed'}
        </Text>

        <Text className="font-robotoRegular color-grayMedium mt-[8px]">
          {`Nocap is${
            isAllowed ? ' not' : ''
          } allowed to access this device's ${permissionName.toLowerCase()}.`}
        </Text>
      </View>
      <View className="flex-1 justify-center px-[16px]">
        <BigButton
          style="white"
          label="Update device settings"
          onPress={openSettings}
        />
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
