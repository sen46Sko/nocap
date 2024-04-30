import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  View,
} from 'react-native';
import React from 'react';

import {BigButton} from 'components/atoms/buttons/BigButton';
import {FeedCard} from 'components/organisms/FeedCard';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Plus, SearchWhite} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.HOME>;

export const Home: React.FC<Props> = ({navigation}) => {
  const auth = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-black flex-1 gap-[13px]">
          <View className="px-[10px] py-[16px] flex-row justify-between items-center">
            <Text className=" font-robotoMedium color-white text-[24px]">
              nocap
            </Text>

            <View className="flex-row items-center gap-[24px]">
              <Pressable onPress={() => navigation.navigate(Screens.SEARCH)}>
                <SearchWhite />
              </Pressable>

              <Plus />

              <Pressable
                onPress={() =>
                  navigation.navigate(Screens.PROFILE, {type: 'my'})
                }>
                <View className="h-[24px] w-[24px] rounded-full bg-white" />
              </Pressable>
            </View>
          </View>

          <View className="gap-[24px]">
            <FeedCard
              openImage={() => navigation.navigate(Screens.FEED_CARD_DETAILS)}
              openProfile={() =>
                navigation.navigate(Screens.PROFILE, {type: 'not my'})
              }
            />
            <FeedCard
              openImage={() => navigation.navigate(Screens.FEED_CARD_DETAILS)}
              openProfile={() =>
                navigation.navigate(Screens.PROFILE, {type: 'not my'})
              }
            />
            <FeedCard
              openImage={() => navigation.navigate(Screens.FEED_CARD_DETAILS)}
              openProfile={() =>
                navigation.navigate(Screens.PROFILE, {type: 'not my'})
              }
            />
          </View>

          <BigButton
            label="Log out"
            style="white"
            onPress={() => {
              auth.signOut();
              navigation.navigate(Screens.WELCOME);
            }}
          />

          <BigButton
            label="Delete profile"
            style="white"
            onPress={() => {
              auth.deleteUser();
              navigation.navigate(Screens.WELCOME);
            }}
          />
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
