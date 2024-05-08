import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  View,
} from 'react-native';

import {ContactsList} from 'components/organisms/ContactsList';
import {BigButton} from 'components/atoms/buttons/BigButton';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.CONTACTS>;

export const Contacts: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-[16px] mt-[40px] mb-[100px] gap-[16px]">
          <View className="flex-row items-center justify-between">
            <Text className="color-orange font-robotoMedium text-[16px]">
              Contacts
            </Text>

            <Pressable onPress={() => {}}>
              <Expand />
            </Pressable>
          </View>

          <View className="w-full h-[1px] bg-grayDark" />

          <ContactsList />
        </View>
      </ScrollView>

      <View className="px-[16px] absolute w-full bottom-[74px]">
        <BigButton
          label="Jump in!"
          onPress={() => navigation.navigate(Screens.HOME)}
          style="white"
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
