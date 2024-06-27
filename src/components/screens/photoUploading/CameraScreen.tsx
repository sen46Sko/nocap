import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Camera, CameraType, FlashMode} from 'expo-camera';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {screenWidth} from 'utils/helpers';
import {Expand, Selfie} from 'assets/images';
import {useIsFocused} from '@react-navigation/native';
import {If} from 'components/atoms/If';

type Props = NativeStackScreenProps<RootStackParamList, Screens.CAMERA_SCREEN>;

export const CameraScreen: React.FC<Props> = ({navigation}) => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  const cameraRef = useRef<Camera>(null);

  const isFocused = useIsFocused();

  const toggleCameraType = () => {
    setCameraType(current => {
      if (current === CameraType.front) {
        return CameraType.back;
      }

      return CameraType.front;
    });
  };

  const takePicture = () => {
    cameraRef.current
      ?.takePictureAsync()
      .then(res =>
        navigation.navigate(Screens.IMAGE_PREVIEW, {image: res?.uri || ''}),
      );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="py-[12px] flex-row justify-center items-center">
        <Pressable onPress={navigation.goBack}>
          <Expand />
        </Pressable>
      </View>

      <If condition={isFocused}>
        <Camera
          ref={cameraRef}
          style={styles.cameraView}
          type={cameraType}
          flashMode={flashMode}
        />
      </If>

      <View className="mt-[16px]">
        <View className="flex-row items-center gap-[78px] justify-center px-[58px]">
          <View className="w-[24px]" />
          <Pressable
            className="w-[72px] h-[72px] rounded-full bg-white"
            onPress={takePicture}
          />
          <Pressable onPress={toggleCameraType}>
            <Selfie />
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
  cameraView: {
    width: screenWidth,
    height: (screenWidth / 3) * 4,
  },
});
