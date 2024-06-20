import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';

import {EditorControls} from 'components/molecules/EditorControls';
import {EditorTabs} from 'components/molecules/EditorTabs';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {EditorTabsEnum} from 'utils/types/EditorTabsEnum';
import {EditorFields} from 'utils/types/EditorFields';

import {CheckWhite, CrossOrange, CrossWhite} from 'assets/images';
import {ImageAutoHeight} from 'components/atoms/ImageAutoHeight';
import {screenWidth} from 'utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, Screens.IMAGE_EDITOR>;

export const ImageEditor: React.FC<Props> = ({navigation, route}) => {
  const {image} = route.params;

  const [activeTab, setActiveTab] = useState(EditorTabsEnum.WHITE_BALANCE);
  const [imageSettings, setImageSettings] = useState<EditorFields>({
    saturation: 0,
    hue: 0,
    exposure: 0,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-[8px] flex-row justify-center items-center">
          <Pressable onPress={navigation.goBack}>
            <CrossOrange />
          </Pressable>
        </View>

        {/* <PhotoEditorModal
          visible={true}
          image={{uri: imageUri}}
          onExport={() => {}}
        /> */}

        <View className="mt-[16px] h-full items-center">
          <ImageAutoHeight
            uri={image.path}
            width={screenWidth}
            className="rounded-t-[8px]"
          />

          <View className="w-full px-[16px] gap-[40px]">
            <View className="w-full">
              <EditorControls
                activeTab={activeTab}
                imageSettings={imageSettings}
                setImageSettings={setImageSettings}
              />
            </View>

            <View className="w-full">
              <EditorTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </View>

            <View className="flex-row justify-between items-center w-full">
              <Pressable onPress={navigation.goBack}>
                <CrossWhite />
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate(Screens.POST_SETTINGS, {image})
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
