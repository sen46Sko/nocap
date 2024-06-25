import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  View,
} from 'react-native';

import {SmallButton} from 'components/atoms/buttons/SmallButton';

import {usePosts} from 'contexts/PostsContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {getDeviceInfo, saveImage} from 'utils/helpers/post';
import {getLocation} from 'utils/helpers/post';
import {Post} from 'utils/types/Post';

import {Expand} from 'assets/images';
import {ImageAutoHeight} from 'components/atoms/ImageAutoHeight';
import {screenWidth} from 'utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, Screens.IMAGE_POSTING>;

export const ImagePosting: React.FC<Props> = ({navigation, route}) => {
  const {image, settings} = route.params;

  const [title, setTitle] = useState('');

  const posts = usePosts();

  const handlePost = async () => {
    const post: Omit<Post, 'id' | 'views' | 'loves' | 'userId'> = {
      imageLink: image,
      title,
      location: null,
      deviceInfo: null,
    };

    if (settings.saveToGalery) {
      saveImage(image);
    }

    if (settings.deviceInfo) {
      const deviceInfo = await getDeviceInfo();
      post.deviceInfo = deviceInfo;
    }

    if (settings.location) {
      const location = await getLocation();
      post.location = location;
    }

    await posts.postImage(post);
    navigation.navigate(Screens.HOME);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-[16px] px-[16px] flex-row justify-between items-center">
          <Pressable onPress={navigation.goBack} className="rotate-90">
            <Expand />
          </Pressable>

          <SmallButton label="Post" onPress={handlePost} />
        </View>

        <View className="mt-[16px] h-full items-center">
          <ImageAutoHeight
            uri={image}
            width={screenWidth}
            className=" rounded-t-[8px]"
          />

          <View className="w-full px-[16px] gap-[40px] mt-[22px] font-robotoRegular text-[16px]">
            <TextInput
              placeholder="Add caption"
              className="color-white"
              placeholderTextColor="#ffffff"
              value={title}
              onChangeText={setTitle}
            />
          </View>
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
