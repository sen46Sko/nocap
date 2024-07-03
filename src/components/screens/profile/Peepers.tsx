import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import classNames from 'classnames';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  View,
} from 'react-native';

import {ContactsList} from 'components/organisms/ContactsList';
import {ContactItem} from 'components/molecules/ContactItem';
import {If} from 'components/atoms/If';

import {useAuth} from 'contexts/AuthContext';

import {getPeepers, getUserIfExists} from 'api/users';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {User} from 'utils/types/User';

import {Expand} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.PEEPERS>;

export const Peepers: React.FC<Props> = ({navigation, route}) => {
  const {userId} = route.params;
  const [activeTab, setActiveTab] = useState<'peepers' | 'peeps' | 'contacts'>(
    'peepers',
  );
  const [peepers, setPeepers] = useState<User[]>([]);
  const [peeps, setPeeps] = useState<User[]>([]);

  const auth = useAuth();

  useEffect(() => {
    getPeepers(userId).then(async peepersIds => {
      const user =
        auth.user?.id === userId ? auth.user : await getUserIfExists(userId);
      const fetchedPeeps: User[] = [];
      const fetchedPeepers: User[] = [];

      for (const peepId of user!.peeps) {
        await getUserIfExists(peepId).then(res => {
          if (res) {
            fetchedPeeps.push(res);
          }
        });
      }

      for (const peeperId of peepersIds) {
        await getUserIfExists(peeperId).then(res => {
          if (res) {
            fetchedPeepers.push(res);
          }
        });
      }

      setPeeps(fetchedPeeps);
      setPeepers(fetchedPeepers);
    });
  }, [auth.user, userId]);

  const peepUser = (id: string) => {
    if (auth.user?.peeps.some(peepId => peepId === id)) {
      auth.setPeeping('unpeep', id);
    } else {
      auth.setPeeping('peep', id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-[16px] py-[12px] flex-row items-center justify-between border-b border-grayDark">
          <View className="flex-row items-center gap-[10px]">
            <Pressable onPress={() => setActiveTab('peepers')}>
              <Text
                className={classNames('font-robotoMedium text-[16px]', {
                  'color-orange': activeTab === 'peepers',
                  'color-grayMedium': activeTab !== 'peepers',
                })}>
                {`${peepers.length} Peepers`}
              </Text>
            </Pressable>

            <View className="h-[5px] w-[5px] rounded-full bg-grayMedium" />

            <Pressable onPress={() => setActiveTab('peeps')}>
              <Text
                className={classNames('font-robotoMedium text-[16px]', {
                  'color-orange': activeTab === 'peeps',
                  'color-grayMedium': activeTab !== 'peeps',
                })}>
                {`${peeps.length} Peeps`}
              </Text>
            </Pressable>

            <If condition={userId === auth.user?.id}>
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
            </If>
          </View>

          <Pressable onPress={() => navigation.goBack()}>
            <Expand />
          </Pressable>
        </View>

        <View className="mt-[16px]">
          <If condition={activeTab === 'peepers'}>
            <View className="px-[16px] gap-[16px]">
              {peepers.map(user => (
                <ContactItem
                  key={user.id}
                  name={user.username}
                  buttonLabel={
                    auth.user?.peeps.some(id => id === user.id)
                      ? 'Peeping'
                      : 'Peep'
                  }
                  photoUri={user.imageLink}
                  onPress={() => peepUser(user.id)}
                />
              ))}
            </View>
          </If>

          <If condition={activeTab === 'peeps'}>
            <View className="px-[16px] gap-[16px]">
              {peeps.map(user => (
                <ContactItem
                  key={user.id}
                  name={user.username}
                  buttonLabel="Peeping"
                  photoUri={user.imageLink}
                  onPress={() => peepUser(user.id)}
                />
              ))}
            </View>
          </If>

          <If condition={activeTab === 'contacts'}>
            <ContactsList />
          </If>
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
