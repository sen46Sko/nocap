import {SafeAreaView, StyleSheet, Pressable, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import {useAuth} from 'contexts/AuthContext';

import {getPeepersCount, getUserIfExists} from 'api/users';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand} from 'assets/images';
import {User} from 'utils/types/User';

type Props = NativeStackScreenProps<RootStackParamList, Screens.PEEPERS>;

export const Peepers: React.FC<Props> = ({navigation, route}) => {
  const {userId} = route.params;
  const [activeTab, setActiveTab] = useState<'peepers' | 'peeps' | 'contacts'>(
    'peepers',
  );
  const [peepersCount, setPeepersCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  const auth = useAuth();

  useEffect(() => {
    getPeepersCount(userId).then(setPeepersCount);

    if (auth.user?.id === userId) {
      setUser(auth.user);
    } else {
      getUserIfExists(userId).then(setUser);
    }
  }, [auth.user, userId]);

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[16px] py-[12px] flex-row items-center justify-between border-b border-grayDark">
        <View className="flex-row items-center gap-[10px]">
          <Pressable onPress={() => setActiveTab('peepers')}>
            <Text
              className={classNames('font-robotoMedium text-[16px]', {
                'color-orange': activeTab === 'peepers',
                'color-grayMedium': activeTab !== 'peepers',
              })}>
              {`${peepersCount} Peepers`}
            </Text>
          </Pressable>

          <View className="h-[5px] w-[5px] rounded-full bg-grayMedium" />

          <Pressable onPress={() => setActiveTab('peeps')}>
            <Text
              className={classNames('font-robotoMedium text-[16px]', {
                'color-orange': activeTab === 'peeps',
                'color-grayMedium': activeTab !== 'peeps',
              })}>
              {`${user?.peeps.length} Peeps`}
            </Text>
          </Pressable>

          <View className="h-[5px] w-[5px] rounded-full bg-grayMedium" />

          <Pressable onPress={() => setActiveTab('contacts')}>
            <Text
              className={classNames('font-robotoMedium text-[16px]', {
                'color-orange': activeTab === 'contacts',
                'color-grayMedium': activeTab !== 'contacts',
              })}>
              Contacts
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={() => navigation.goBack()}>
          <Expand />
        </Pressable>
      </View>

      <View className="p-[16px] gap-[16px]" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
