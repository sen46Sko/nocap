import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
} from 'react-native';

import {SmallButton} from 'components/atoms/buttons/SmallButton';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {takePhoto} from 'utils/helpers';

import {CrossOrange} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.IMAGE_PICKER>;

export const ImagePicker: React.FC<Props> = ({navigation}) => {
  const [photo, setPhoto] = useState({
    path: 'https://i.pinimg.com/736x/61/21/df/6121dff24d943ef8878e926f865ec4e4.jpg',
    base64: '',
  });

  useEffect(() => {
    takePhoto().then(res => {
      if (res) {
        setPhoto(res);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View className="py-[12px] flex-row justify-center items-center">
        <Pressable onPress={navigation.goBack}>
          <CrossOrange />
        </Pressable>
      </View>

      <View className="gap-[16px] mt-[16px] h-full items-center justify-between">
        <Image
          source={{uri: photo.path}}
          className="w-full h-[516px] rounded-t-[8px]"
        />

        <View className="absolute bottom-[100px] flex-row gap-[28px] items-center">
          <SmallButton
            label="Edit"
            onPress={() =>
              navigation.navigate(Screens.IMAGE_EDITOR, {image: photo})
            }
          />
          <Pressable
            onPress={() =>
              navigation.navigate(Screens.POST_SETTINGS, {image: photo})
            }>
            <Text className=" font-robotoMedium text-[16px] color-orange">
              Skip
            </Text>
          </Pressable>
        </View>
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
