import {SafeAreaView, StyleSheet, Pressable, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {SmallButton} from 'components/atoms/buttons/SmallButton';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {screenWidth} from 'utils/helpers';

import {CrossOrange} from 'assets/images';
import {ImageAutoHeight} from 'components/atoms/ImageAutoHeight';

type Props = NativeStackScreenProps<RootStackParamList, Screens.IMAGE_PREVIEW>;

export const ImagePreview: React.FC<Props> = ({navigation, route}) => {
  const {image} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View className="py-[12px] flex-row justify-center items-center">
        <Pressable onPress={navigation.goBack}>
          <CrossOrange />
        </Pressable>
      </View>

      <View className="gap-[16px] mt-[16px] h-full items-center justify-between">
        <ImageAutoHeight
          uri={image}
          width={screenWidth}
          className="rounded-t-[8px]"
        />

        <View className="absolute bottom-[100px] flex-row gap-[28px] items-center">
          <SmallButton
            label="Edit"
            onPress={() => navigation.navigate(Screens.IMAGE_EDITOR, {image})}
          />
          <Pressable
            onPress={() => navigation.navigate(Screens.POST_SETTINGS, {image})}>
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
