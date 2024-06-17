import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  View,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';

import {EditorTabs} from 'components/molecules/EditorTabs';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {EditorTabsEnum} from 'utils/types/EditorTabsEnum';

import {CheckWhite, CrossOrange, CrossWhite} from 'assets/images';
import {EditorControls} from 'components/molecules/EditorControls';
import {EditorFields} from 'utils/types/EditorFields';

type Props = NativeStackScreenProps<RootStackParamList, Screens.IMAGE_EDITOR>;

export const ImageEditor: React.FC<Props> = ({navigation, route}) => {
  const {imageUri} = route.params;

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
          <Image
            source={{uri: imageUri}}
            className="w-full h-[516px] rounded-t-[8px]"
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
                  navigation.navigate(Screens.IMAGE_POSTING, {imageUri})
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
