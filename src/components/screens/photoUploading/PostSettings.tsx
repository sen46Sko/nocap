import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  View,
  Text,
} from 'react-native';
import React, {useState} from 'react';

import {SelectItem} from 'components/molecules/SelectItem';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CheckOrange, CrossOrange} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.POST_SETTINGS>;

export const PostSettings: React.FC<Props> = ({navigation, route}) => {
  const {imageUri} = route.params;
  const [location, setLocation] = useState(false);
  const [saveToGalery, setSaveToGalery] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(false);
  const [highQuality, setHighQuality] = useState(false);
  const [maxResolution, setMaxResolution] = useState(false);
  const [postType, setPostType] = useState<'photo' | 'onspot' | 'video'>(
    'photo',
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-[16px] py-[12px] flex-row justify-between items-center border-b border-grayDark">
          <Pressable onPress={navigation.goBack}>
            <CrossOrange />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate(Screens.IMAGE_POSTING, {
                imageUri,
                settings: {
                  location,
                  saveToGalery,
                  deviceInfo,
                  highQuality,
                  maxResolution,
                },
              })
            }>
            <CheckOrange />
          </Pressable>
        </View>

        <View className="mt-[16px] h-full items-center px-[16px] gap-[24px]">
          <SelectItem
            label="Locaiton of feed"
            type="check"
            isSelected={location}
            onSelect={() => setLocation(current => !current)}
          />

          <SelectItem
            label="Auto save on gallery"
            type="check"
            isSelected={saveToGalery}
            onSelect={() => setSaveToGalery(current => !current)}
          />

          <SelectItem
            label="Device info"
            type="check"
            isSelected={deviceInfo}
            onSelect={() => setDeviceInfo(current => !current)}
          />

          <SelectItem
            label="High quality photo"
            type="check"
            isSelected={highQuality}
            onSelect={() => setHighQuality(current => !current)}
          />

          <SelectItem
            label="Post at max resolution"
            type="check"
            isSelected={maxResolution}
            onSelect={() => setMaxResolution(current => !current)}
          />

          <Text className="self-center color-white text-[16px] font-robotoRegular">
            Post type
          </Text>

          <SelectItem
            label="Photo"
            type="radio"
            isSelected={postType === 'photo'}
            onSelect={() => setPostType('photo')}
          />

          <SelectItem
            label="Onspot"
            type="radio"
            isSelected={postType === 'onspot'}
            onSelect={() => setPostType('onspot')}
          />

          <SelectItem
            label="Video"
            type="radio"
            isSelected={postType === 'video'}
            onSelect={() => setPostType('video')}
          />
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
