import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';

import {SelectItem} from 'components/molecules/SelectItem';

import {useSettings} from 'contexts/CameraSettingsContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CheckOrange, CrossOrange} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.CAMERA_SETTINGS
>;

export const CameraSettings: React.FC<Props> = ({navigation}) => {
  const [location, setLocation] = useState(false);
  const [saveToGalery, setSaveToGalery] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(false);
  const [highQuality, setHighQuality] = useState(false);

  const settings = useSettings();

  useEffect(() => {
    setLocation(settings.location);
    setSaveToGalery(settings.saveToGalery);
    setDeviceInfo(settings.deviceInfo);
    setHighQuality(settings.highQuality);
  }, [
    settings.deviceInfo,
    settings.highQuality,
    settings.location,
    settings.saveToGalery,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-[16px] py-[12px] flex-row justify-between items-center border-b border-grayDark">
          <Pressable onPress={navigation.goBack}>
            <CrossOrange />
          </Pressable>
          <Pressable
            onPress={() => {
              settings.setLocation(location);
              settings.setDeviceInfo(deviceInfo);
              settings.setHighQuality(highQuality);
              settings.setSaveToGalery(saveToGalery);
              navigation.goBack();
            }}>
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
