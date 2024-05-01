import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {CustomInput} from 'components/atoms/CustomInput';
import {UserCard} from 'components/organisms/UserCard';
import {If} from 'components/atoms/If';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand, SearchLightGray, SeeMore} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.SEARCH>;

export const Search: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-black flex-1 gap-[16px] px-[10px]">
          <View className="px-[10px] py-[16px] flex-row justify-center items-center">
            <Pressable onPress={() => navigation.navigate(Screens.HOME)}>
              <Expand />
            </Pressable>
          </View>

          <CustomInput
            value={searchQuery}
            setValue={setSearchQuery}
            placeholder="Discover"
            Icon={SearchLightGray}
          />

          <If condition={!!searchQuery}>
            <View className="gap-[16px]">
              <View className="flex-row justify-between">
                <Text className="font-robotoMedium text-[16px] color-white">
                  For you
                </Text>
                <Text className="font-robotoMedium text-[16px] color-grayMedium">
                  Trending
                </Text>
                <Text className="font-robotoMedium text-[16px] color-grayMedium">
                  Account
                </Text>
                <Text className="font-robotoMedium text-[16px] color-grayMedium">
                  Places
                </Text>
                <Text className="font-robotoMedium text-[16px] color-grayMedium">
                  Others
                </Text>
              </View>

              <View className="flex-row gap-[5px] flex-wrap justify-center">
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[121px] h-[129px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[121px] h-[129px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[121px] h-[129px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[121px] h-[129px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[121px] h-[129px] rounded-[4px]"
                />
                <Image
                  source={{
                    uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                  }}
                  className="w-[121px] h-[129px] rounded-[4px]"
                />
              </View>

              <Text className="font-robotoRegular text-[16px] color-orange self-center mt-[24px]">
                See more
              </Text>
            </View>
          </If>

          <If condition={!searchQuery}>
            <View className="gap-[24px]">
              <View className="gap-[8px]">
                <View className="flex-row items-center justify-between">
                  <Text className="font-robotoMedium text-[16px] color-white">
                    Trending
                  </Text>
                  <Text className="font-robotoMedium color-orange">
                    See more
                  </Text>
                </View>

                <View className="flex-row gap-[5px] flex-wrap justify-center">
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                </View>
              </View>

              <View className="gap-[8px]">
                <Text className="font-robotoMedium text-[16px] color-white">
                  Suggested for you
                </Text>

                <View className="flex-row gap-[10px] items-center">
                  <UserCard />
                  <UserCard />

                  <View className="gap-[8px] w-[33px] ml-[16px]">
                    <SeeMore />
                    <Text className="font-robotoMedium color-white">
                      See more
                    </Text>
                  </View>
                </View>
              </View>

              <View className="gap-[8px]">
                <View className="flex-row items-center justify-between">
                  <Text className="font-robotoMedium text-[16px] color-white">
                    Posts nearby
                  </Text>
                  <Text className="font-robotoMedium color-orange">
                    See more
                  </Text>
                </View>

                <View className="flex-row gap-[5px] flex-wrap justify-center">
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                </View>
              </View>

              <View className="gap-[8px]">
                <View className="flex-row items-center justify-between">
                  <Text className="font-robotoMedium text-[16px] color-white">
                    Posts inspired by you
                  </Text>
                  <Text className="font-robotoMedium color-orange">
                    See more
                  </Text>
                </View>

                <View className="flex-row gap-[5px] flex-wrap justify-center">
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                  <Image
                    source={{
                      uri: 'https://c.pxhere.com/photos/d1/14/tree_lone_alone_one_autumn_fall_wind_green-345290.jpg!d',
                    }}
                    className="w-[121px] h-[129px] rounded-[4px]"
                  />
                </View>
              </View>
            </View>
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
