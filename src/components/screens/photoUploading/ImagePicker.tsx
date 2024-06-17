import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

import {takePhoto} from 'utils/helpers';
import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CrossOrange} from 'assets/images';
import {SmallButton} from 'components/atoms/buttons/SmallButton';

type Props = NativeStackScreenProps<RootStackParamList, Screens.IMAGE_PICKER>;

export const ImagePicker: React.FC<Props> = ({navigation}) => {
  const [photo, setPhoto] = useState(
    'https://i.pinimg.com/736x/61/21/df/6121dff24d943ef8878e926f865ec4e4.jpg',
  );

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
          source={{uri: photo}}
          className="w-full h-[516px] rounded-t-[8px]"
        />

        <View className="absolute bottom-[100px] flex-row gap-[28px] items-center">
          <SmallButton
            label="Edit"
            onPress={() =>
              navigation.navigate(Screens.IMAGE_EDITOR, {imageUri: photo})
            }
          />
          <Pressable
            onPress={() =>
              navigation.navigate(Screens.IMAGE_POSTING, {imageUri: photo})
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
