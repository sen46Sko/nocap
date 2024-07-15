import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';

import {CustomInput} from 'components/atoms/CustomInput';
import {UserCard} from 'components/organisms/UserCard';
import {If} from 'components/atoms/If';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {getAllUsers, getSuggestedUsers} from 'api/users';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {Post} from 'utils/types/Post';
import {User} from 'utils/types/User';

import {Expand, SearchLightGray} from 'assets/images';
import FastImage from 'react-native-fast-image';
import classNames from 'classnames';
import {ContactItem} from 'components/molecules/ContactItem';

type Props = NativeStackScreenProps<RootStackParamList, Screens.SEARCH>;

type SearchTabs = 'forYou' | 'trending' | 'account' | 'places' | 'others';

export const Search: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggested, setSuggested] = useState<User[]>([]);
  const [activeSearchTab, setActiveSearchTab] = useState<SearchTabs>('forYou');
  const [users, setUsers] = useState<User[]>([]);

  const posts = usePosts();
  const auth = useAuth();

  const peepUser = (id: string) => {
    if (auth.user?.peeps.some(peepId => peepId === id)) {
      auth.setPeeping('unpeep', id);
    } else {
      auth.setPeeping('peep', id);
    }
  };

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  useEffect(() => {
    getSuggestedUsers(auth.user?.id!).then(setSuggested);
  }, [auth.user?.id]);

  const trendingPosts = useMemo(() => {
    const sortingFunc = (a: Post, b: Post) => b.loves.length - a.loves.length;

    return [...posts.posts].sort(sortingFunc);
  }, [posts.posts]);

  const foundAccounts = useMemo(() => {
    if (activeSearchTab !== 'account') {
      return [];
    }

    return users.filter(
      user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
        user.username !== auth.user?.username,
    );
  }, [activeSearchTab, auth.user?.username, searchQuery, users]);

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
                <Pressable onPress={() => setActiveSearchTab('forYou')}>
                  <Text
                    className={classNames('font-robotoMedium text-[16px]', {
                      'color-white': activeSearchTab === 'forYou',
                      'color-grayMedium': activeSearchTab !== 'forYou',
                    })}>
                    For you
                  </Text>
                </Pressable>

                <Pressable onPress={() => setActiveSearchTab('trending')}>
                  <Text
                    className={classNames('font-robotoMedium text-[16px]', {
                      'color-white': activeSearchTab === 'trending',
                      'color-grayMedium': activeSearchTab !== 'trending',
                    })}>
                    Trending
                  </Text>
                </Pressable>

                <Pressable onPress={() => setActiveSearchTab('account')}>
                  <Text
                    className={classNames('font-robotoMedium text-[16px]', {
                      'color-white': activeSearchTab === 'account',
                      'color-grayMedium': activeSearchTab !== 'account',
                    })}>
                    Account
                  </Text>
                </Pressable>

                <Pressable onPress={() => setActiveSearchTab('places')}>
                  <Text
                    className={classNames('font-robotoMedium text-[16px]', {
                      'color-white': activeSearchTab === 'places',
                      'color-grayMedium': activeSearchTab !== 'places',
                    })}>
                    Places
                  </Text>
                </Pressable>

                <Pressable onPress={() => setActiveSearchTab('others')}>
                  <Text
                    className={classNames('font-robotoMedium text-[16px]', {
                      'color-white': activeSearchTab === 'others',
                      'color-grayMedium': activeSearchTab !== 'others',
                    })}>
                    Others
                  </Text>
                </Pressable>
              </View>

              <View className="items-center">
                <If condition={activeSearchTab !== 'account'}>
                  <View style={styles.photosContainer}>
                    {foundPosts.map(post => (
                      <Pressable
                        onPress={() => openPost(post.id)}
                        key={post.id}>
                        <FastImage
                          source={{
                            uri: post.imageLink,
                          }}
                          style={styles.image}
                        />
                      </Pressable>
                    ))}
                  </View>
                </If>
                <If condition={activeSearchTab === 'account'}>
                  <View className="w-full gap-[16px]">
                    {foundAccounts.map(user => (
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

                <View className="items-center">
                  <View style={styles.photosContainer}>
                    {trendingPosts.map(post => (
                      <Pressable
                        onPress={() => openPost(post.id)}
                        key={post.id}>
                        <FastImage
                          source={{
                            uri: post.imageLink,
                          }}
                          style={styles.image}
                        />
                      </Pressable>
                    ))}
                  </View>
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

                <View className="items-center">
                  <View style={styles.photosContainer}>
                    {posts.posts.map(post => (
                      <Pressable
                        onPress={() => openPost(post.id)}
                        key={post.id}>
                        <FastImage
                          source={{
                            uri: post.imageLink,
                          }}
                          style={styles.image}
                        />
                      </Pressable>
                    ))}
                  </View>
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
  image: {
    width: 120,
    height: 120,
    borderRadius: 4,
  },
  photosContainer: {
    width: 375,
    gap: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
