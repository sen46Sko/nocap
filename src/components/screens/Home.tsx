import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ListRenderItemInfo,
  SafeAreaView,
  Pressable,
  ViewToken,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React, {useCallback} from 'react';
import FastImage from 'react-native-fast-image';

import {FeedCard} from 'components/organisms/FeedCard';

import {usePosts} from 'contexts/PostsContext';
import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {Post} from 'utils/types/Post';

import {Plus, SearchWhite} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.HOME>;

export const Home: React.FC<Props> = ({navigation}) => {
  const auth = useAuth();
  const posts = usePosts();

  const renderFeedCard = useCallback(
    ({item: post}: ListRenderItemInfo<Post>) => (
      <FeedCard
        key={post.id}
        post={post}
        openImage={() =>
          navigation.navigate(Screens.FEED_CARD_DETAILS, {
            postId: post.id,
          })
        }
        openProfile={() =>
          navigation.navigate(Screens.PROFILE, {userId: post.userId})
        }
      />
    ),
    [navigation],
  );

  const renderSeparator = useCallback(() => <View className="h-[24px]" />, []);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      for (const viewable of viewableItems) {
        posts.addView(viewable.item.id);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <View className="bg-black flex-1 gap-[13px]">
      <SafeAreaView>
        <View className="px-[10px] py-[16px] flex-row justify-between items-center">
          <Text className=" font-robotoMedium color-white text-[24px]">
            nocap
          </Text>

          <View className="flex-row items-center gap-[24px]">
            <Pressable onPress={() => navigation.navigate(Screens.SEARCH)}>
              <SearchWhite />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate(Screens.CAMERA_SCREEN)}>
              <Plus />
            </Pressable>

            <Pressable
              onPress={() =>
                navigation.navigate(Screens.PROFILE, {
                  userId: auth.user?.id || '',
                })
              }>
              <FastImage
                source={{uri: auth.user?.imageLink || ''}}
                style={styles.avatar}
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <FlatList
        data={posts.posts}
        renderItem={renderFeedCard}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
});
