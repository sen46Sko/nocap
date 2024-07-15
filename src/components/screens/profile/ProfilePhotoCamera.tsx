import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Camera, CameraType, FlashMode} from 'expo-camera';
import {FlipType, manipulateAsync} from 'expo-image-manipulator';
import React, {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';

import {CameraView} from 'components/organisms/CameraView';
import {If} from 'components/atoms/If';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand, Selfie, FlashCircle} from 'assets/images';
import {ImageAutoHeight} from 'components/atoms/ImageAutoHeight';
import {screenWidth} from 'utils/helpers';
import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {LoaderSpinner} from 'components/organisms/LoaderSpinner';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.PROFILE_PHOTO_CAMERA
>;

export const ProfilePhotoCamera: React.FC<Props> = ({navigation}) => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [imageUri, setImageUri] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const cameraRef = useRef<Camera>(null);

  const auth = useAuth();
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
        return FlashMode.off;
      }

      return FlashMode.on;
    });
  };

  const takePicture = async () => {
    if (imageUri) {
      return;
    }

    let file = await cameraRef.current?.takePictureAsync();

    if (!file) {
      return;
    }

    if (cameraType === CameraType.front) {
      file = await manipulateAsync(file.uri, [
        {rotate: 180},
        {flip: FlipType.Vertical},
      ]);
    }

    setImageUri(file.uri);
  };

  const saveImage = async () => {
    if (!imageUri || !auth.user) {
      return;
    }
    setIsLoading(true);
    await auth.updateProfilePhoto(imageUri);
    navigation.navigate(Screens.PROFILE, {userId: auth.user.id});
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="py-[12px] px-[16px] flex-row justify-center items-center relative">
        <Pressable onPress={navigation.goBack}>
          <Expand />
        </Pressable>
      </View>

      <If condition={isFocused}>
        {imageUri ? (
          <ImageAutoHeight uri={imageUri} width={screenWidth} />
        ) : (
          <CameraView
            ref={cameraRef}
            cameraType={cameraType}
            flashMode={flashMode}
          />
        )}
      </If>

      <View className="mt-[16px]">
        <View className="flex-row items-center justify-between px-[16px]">
          <Text className="text-[16px] font-robotoMedium color-grayLight">
            Add profile picture
          </Text>
          <SmallButton label="Save" onPress={saveImage} />
        </View>
        <View className="flex-row mt-[40px] items-center gap-[78px] justify-center px-[58px]">
          <Pressable onPress={toggleFlash}>
            <FlashCircle />
          </Pressable>
          <Pressable
            className="w-[72px] h-[72px] rounded-full bg-white items-center justify-center"
            onPress={takePicture}
          />
          <Pressable onPress={toggleCameraType}>
            <Selfie />
          </Pressable>
        </View>
        <Text className="self-center mt-[16px] text-[16px] font-robotoRegular color-grayLight">
          Capture
        </Text>
      </View>
      <If condition={isLoading}>
        <LoaderSpinner />
      </If>
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
