import {
  Camera,
  CameraType,
  FlashMode,
  requestCameraPermissionsAsync,
  requestMicrophonePermissionsAsync,
} from 'expo-camera';
import React, {forwardRef, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {screenWidth} from 'utils/helpers';

type Props = {
  cameraType: CameraType;
  flashMode: FlashMode;
};

export const CameraView = forwardRef<Camera, Props>(
  ({cameraType, flashMode}, ref) => {
    const [isCameraGranted, setIsCameraGranted] = useState(false);
    const [isMicrophoneGranted, setIsMicrophoneGranted] = useState(false);

    useEffect(() => {
      requestCameraPermissionsAsync()
        .then(res => setIsCameraGranted(res.granted))
        .then(() => {
          requestMicrophonePermissionsAsync().then(res =>
            setIsMicrophoneGranted(res.granted),
          );
        });
    }, []);
    return isCameraGranted && isMicrophoneGranted ? (
      <Camera
        ref={ref}
        style={styles.cameraView}
        type={cameraType}
        flashMode={flashMode}
      />
    ) : (
      <View style={styles.cameraView} />
    );
  },
);

const styles = StyleSheet.create({
  cameraView: {
    width: screenWidth,
    height: (screenWidth / 3) * 4,
  },
});
