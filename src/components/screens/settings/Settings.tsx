import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand} from 'assets/images';
import {If} from 'components/atoms/If';

type Props = NativeStackScreenProps<RootStackParamList, Screens.SETTINGS>;

export const Settings: React.FC<Props> = ({navigation}) => {
  const auth = useAuth();

  const birthday = useMemo(() => {
    const date = auth.user?.birthDate.toDate();
    if (!date) {
      return '';
    }

    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }, [auth.user?.birthDate]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-[16px] py-[12px] flex-row gap-[16px] items-center border-b border-grayDark">
          <Pressable onPress={() => navigation.goBack()} className="rotate-90">
            <Expand />
          </Pressable>
          <Text className="font-robotoMedium text-[16px] color-grayLight">
            User settings
          </Text>
        </View>

        <View className="px-[16px] gap-[24px] mt-[24px]">
          <Text className="font-robotoMedium self-center color-grayLight">
            BASIC INFO
          </Text>

          <Pressable
            onPress={() => navigation.navigate(Screens.USERNAME_SETTINGS)}>
            <View className="gap-[8px]">
              <Text className="font-robotoRegular text-[16px] color-grayLight">
                Name
              </Text>
              <Text className="font-robotoMedium text-[16px] color-white">
                {auth.user?.username}
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate(Screens.USERNAME_SETTINGS)}>
            <View className="gap-[8px]">
              <Text className="font-robotoRegular text-[16px] color-grayLight">
                Username
              </Text>
              <Text className="font-robotoMedium text-[16px] color-white">
                {auth.user?.username}
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate(Screens.BIRTHDATE_SETTINGS)}>
            <View className="gap-[8px]">
              <Text className="font-robotoRegular text-[16px] color-grayLight">
                Birthday
              </Text>
              <Text className="font-robotoMedium text-[16px] color-white">
                {birthday}
              </Text>
            </View>
          </Pressable>

          <View className="gap-[8px]">
            <Text className="font-robotoRegular text-[16px] color-grayLight">
              Gender
            </Text>
            <Text className="font-robotoMedium text-[16px] color-white">
              {auth.user?.gender}
            </Text>
          </View>

          <Text className="font-robotoMedium self-center color-grayLight">
            LOGIN INFO
          </Text>

          <If condition={!!auth.user?.email}>
            <View className="gap-[8px]">
              <Text className="font-robotoRegular text-[16px] color-grayLight">
                Email
              </Text>
              <Text className="font-robotoMedium text-[16px] color-white">
                {auth.user?.email || '-'}
              </Text>
            </View>
          </If>

          <If condition={!!auth.user?.phoneNumber}>
            <View className="gap-[8px]">
              <Text className="font-robotoRegular text-[16px] color-grayLight">
                Phone number
              </Text>
              <Text className="font-robotoMedium text-[16px] color-white">
                {auth.user?.phoneNumber || '-'}
              </Text>
            </View>
          </If>

          <Text className="font-robotoMedium self-center color-grayLight">
            OTHERS
          </Text>

          <Text className="font-robotoMedium text-[16px] color-grayLight">
            Language
          </Text>

          <Text className="font-robotoMedium text-[16px] color-grayLight">
            Device permissions
          </Text>

          <Text className="font-robotoMedium text-[16px] color-grayLight">
            App info
          </Text>

          <Pressable
            onPress={() => {
              auth.signOut();
              navigation.navigate(Screens.WELCOME);
            }}>
            <Text className="font-robotoMedium text-[16px] color-red">
              Log out
            </Text>
          </Pressable>
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