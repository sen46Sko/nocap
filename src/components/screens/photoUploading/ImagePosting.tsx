import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand} from 'assets/images';
import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {usePosts} from 'contexts/PostsContext';

type Props = NativeStackScreenProps<RootStackParamList, Screens.IMAGE_POSTING>;

export const ImagePosting: React.FC<Props> = ({navigation, route}) => {
  const {imageUri} = route.params;

  const [title, setTitle] = useState('');

  const posts = usePosts();

  const handlePost = async () => {
    if (!imageUri) {
      return;
    }

    await posts.postImage(imageUri, title);

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
          <Image
            source={{uri: imageUri}}
            className="w-full h-[516px] rounded-t-[8px]"
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
