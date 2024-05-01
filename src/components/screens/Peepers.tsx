import {SafeAreaView, StyleSheet, Pressable, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand} from 'assets/images';
import {ContactItem} from 'components/molecules/ContactItem';
import classNames from 'classnames';

type Props = NativeStackScreenProps<RootStackParamList, Screens.PEEPERS>;

export const Peepers: React.FC<Props> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState<'peepers' | 'peeps' | 'contacts'>(
    'peepers',
  );

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
              25 Peepers
            </Text>
          </Pressable>

          <View className="h-[5px] w-[5px] rounded-full bg-grayMedium" />

          <Pressable onPress={() => setActiveTab('peeps')}>
            <Text
              className={classNames('font-robotoMedium text-[16px]', {
                'color-orange': activeTab === 'peeps',
                'color-grayMedium': activeTab !== 'peeps',
              })}>
              100 Peeps
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

      <View className="p-[16px] gap-[16px]">
        <ContactItem
          name="Van heusen"
          buttonLabel="Peep"
          onPress={() => {}}
          photoUri=""
        />

        <ContactItem
          name="Rahul K"
          buttonLabel="Peep"
          onPress={() => {}}
          photoUri=""
        />

        <ContactItem
          name="Varun"
          buttonLabel="Peep"
          onPress={() => {}}
          photoUri=""
        />

        <ContactItem
          name="Andrews"
          buttonLabel="Peep"
          onPress={() => {}}
          photoUri=""
        />

        <ContactItem
          name="Salman Van"
          buttonLabel="Peep"
          onPress={() => {}}
          photoUri=""
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
