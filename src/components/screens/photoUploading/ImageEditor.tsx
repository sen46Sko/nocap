import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';

import {ImageAutoHeight} from 'components/atoms/ImageAutoHeight';
import {EditorTabs} from 'components/molecules/EditorTabs';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {EditorTabsEnum} from 'utils/types/EditorTabsEnum';
import {screenWidth} from 'utils/helpers';

import {CheckWhite, CrossOrange, CrossWhite} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.IMAGE_EDITOR>;

export const ImageEditor: React.FC<Props> = ({navigation, route}) => {
  const {image} = route.params;

  const [activeTab, setActiveTab] = useState(EditorTabsEnum.WHITE_BALANCE);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-[8px] flex-row justify-center items-center">
          <Pressable onPress={navigation.goBack}>
            <CrossOrange />
          </Pressable>
        </View>

        <View className="mt-[16px] h-full items-center">
          <ImageAutoHeight
            uri={image}
            width={screenWidth}
            className="rounded-t-[8px]"
          />

          <View className="w-full px-[16px] gap-[40px]">
            <View className="w-full">
              <EditorTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </View>

            <View className="flex-row justify-between items-center w-full">
              <Pressable onPress={navigation.goBack}>
                <CrossWhite />
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate(Screens.POST_SETTINGS, {
                    image: image,
                  })
                }>
                <CheckWhite />
              </Pressable>
            </View>
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
