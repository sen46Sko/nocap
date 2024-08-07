import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {Camera, CameraType, FlashMode} from 'expo-camera';
import {FlipType, manipulateAsync} from 'expo-image-manipulator';
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';
import React, {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';

import {If} from 'components/atoms/If';

import {useSettings} from 'contexts/CameraSettingsContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {screenWidth} from 'utils/helpers';

import {
  FlashAuto,
  FlashOff,
  Settings,
  TimerOff,
  Timer10,
  Timer3,
  Timer5,
  Expand,
  Selfie,
  Flash,
  Square,
} from 'assets/images';
import {CameraView} from 'components/organisms/CameraView';

type Props = NativeStackScreenProps<RootStackParamList, Screens.CAMERA_SCREEN>;

export const CameraScreen: React.FC<Props> = ({navigation}) => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const cameraRef = useRef<Camera>(null);

  const settings = useSettings();
  const isFocused = useIsFocused();

  const toggleCameraType = () => {
    setCameraType(current => {
      if (current === CameraType.front) {
        return CameraType.back;
      }

      return CameraType.front;
    });
  };

  const toggleFlash = () => {
    setFlashMode(current => {
      if (current === FlashMode.on) {
        return FlashMode.auto;
      }
      if (current === FlashMode.auto) {
        return FlashMode.off;
      }

      return FlashMode.on;
    });
  };

  const toggleTimer = () => {
    setTimer(current => {
      if (current === 0) {
        return 3;
      }

      if (current === 3) {
        return 5;
      }

      if (current === 5) {
        return 10;
      }

      return 0;
    });
  };

  const takePicture = async () => {
    if (timer) {
      await new Promise(resolve => setTimeout(resolve, timer * 1000));
    }

    let file;

    if (settings.postType === 'video') {
      setIsRecording(true);
      file = await cameraRef.current?.recordAsync();
    }

    if (settings.postType === 'photo' || settings.postType === 'onspot') {
      file = await cameraRef.current?.takePictureAsync();
    }

    if (!file) {
      return;
    }

    if (cameraType === CameraType.front) {
      file = await manipulateAsync(file.uri, [
        {rotate: 180},
        {flip: FlipType.Vertical},
      ]);
    }

    navigation.navigate(Screens.IMAGE_PREVIEW, {image: file?.uri});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="py-[12px] px-[16px] flex-row justify-center items-center relative">
        <Pressable onPress={navigation.goBack}>
          <Expand />
        </Pressable>
        <View style={styles.options}>
          <Pressable onPress={toggleFlash}>
            <If condition={flashMode === FlashMode.on}>
              <Flash />
            </If>
            <If condition={flashMode === FlashMode.off}>
              <FlashOff />
            </If>
            <If condition={flashMode === FlashMode.auto}>
              <FlashAuto />
            </If>
          </Pressable>

          <Pressable onPress={toggleTimer}>
            <If condition={timer === 0}>
              <TimerOff />
            </If>
            <If condition={timer === 3}>
              <Timer3 />
            </If>
            <If condition={timer === 5}>
              <Timer5 />
            </If>
            <If condition={timer === 10}>
              <Timer10 />
            </If>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate(Screens.CAMERA_SETTINGS)}>
            <Settings />
          </Pressable>
        </View>
      </View>

      <If condition={isFocused}>
        <CameraView
          ref={cameraRef}
          cameraType={cameraType}
          flashMode={flashMode}
        />
      </If>

      <View className="mt-[16px]">
        <View className="flex-row items-center gap-[78px] justify-center px-[58px]">
          <View className="w-[24px]" />
          <Pressable
            className="w-[72px] h-[72px] rounded-full bg-white items-center justify-center"
            onPress={() => {
              if (settings.postType !== 'video' || !isRecording) {
                takePicture();
                return;
              }

              cameraRef.current?.stopRecording();
              setIsRecording(false);
            }}>
            {isRecording && <Square width={24} height={24} />}
          </Pressable>
          <Pressable onPress={toggleCameraType}>
            <Selfie />
          </Pressable>
        </View>

        <View style={styles.selectorContainer}>
          <DynamicallySelectedPicker
            items={[
              {
                value: 1,
                label: 'Photo',
              },
              {
                value: 2,
                label: 'Onspot',
              },
              {
                value: 3,
                label: 'Video',
              },
            ]}
            onScroll={({index}) => {
              if (index === 0) {
                settings.setPostType('photo');
              }
              if (index === 1) {
                settings.setPostType('onspot');
              }
              if (index === 2) {
                settings.setPostType('video');
              }
            }}
            horizontal
            height={50}
            width={screenWidth}
            allItemsColor="#ffffff"
            fontSize={16}
            renderGradientOverlay={false}
          />
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
  options: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    gap: 24,
  },
  selectorContainer: {
    height: '100%',
    paddingTop: '10%',
  },
});
