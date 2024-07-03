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
import React, {useEffect, useMemo, useState} from 'react';

import {CustomInput} from 'components/atoms/CustomInput';
import {UserCard} from 'components/organisms/UserCard';
import {If} from 'components/atoms/If';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {getSuggestedUsers} from 'api/users';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {Post} from 'utils/types/Post';
import {User} from 'utils/types/User';

import {Expand, SearchLightGray} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.SEARCH>;

export const Search: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggested, setSuggested] = useState<User[]>([]);

  const posts = usePosts();
  const auth = useAuth();

  useEffect(() => {
    getSuggestedUsers(auth.user?.id!).then(setSuggested);
  }, [auth.user?.id]);

  const trendingPosts = useMemo(() => {
    const sortingFunc = (a: Post, b: Post) => b.loves.length - a.loves.length;

    return [...posts.posts].sort(sortingFunc);
  }, [posts.posts]);

  const foundPosts = useMemo(() => {
    return posts.posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [posts.posts, searchQuery]);

  const openPost = (postId: string) => {
    navigation.replace(Screens.FEED_CARD_DETAILS, {
      postId,
    });
  };

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

              <View className="flex-row gap-[5px] flex-wrap">
                {foundPosts.map(post => (
                  <Pressable onPress={() => openPost(post.id)} key={post.id}>
                    <Image
                      source={{
                        uri: post.imageLink,
                      }}
                      className="w-[121px] h-[129px] rounded-[4px]"
                    />
                  </Pressable>
                ))}
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
                  {trendingPosts.map(post => (
                    <Pressable onPress={() => openPost(post.id)} key={post.id}>
                      <Image
                        source={{
                          uri: post.imageLink,
                        }}
                        className="w-[121px] h-[129px] rounded-[4px]"
                      />
                    </Pressable>
                  ))}
                </View>
              </View>

              <If condition={!!suggested.length}>
                <View className="gap-[8px]">
                  <Text className="font-robotoMedium text-[16px] color-white">
                    Suggested for you
                  </Text>

                  <View className="flex-row gap-[10px] items-center">
                    {suggested.map(user => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </View>
                </View>
              </If>

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
                  {posts.posts.map(post => (
                    <Pressable onPress={() => openPost(post.id)} key={post.id}>
                      <Image
                        source={{
                          uri: post.imageLink,
                        }}
                        className="w-[121px] h-[129px] rounded-[4px]"
                      />
                    </Pressable>
                  ))}
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
