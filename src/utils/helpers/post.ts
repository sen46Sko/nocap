import GeoLocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';
// import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export async function getDeviceInfo() {
  const deviceName = await DeviceInfo.getDeviceName();
  const manufacturer = await DeviceInfo.getManufacturer();
  return `${manufacturer} ${deviceName}`;
}

export async function getLocation(): Promise<{
  latitude: number;
  longitude: number;
}> {
  if (Platform.OS === 'ios') {
    await GeoLocation.requestAuthorization('whenInUse');
  }

  return new Promise((resolve, reject) => {
    GeoLocation.getCurrentPosition(res => {
      if (res) {
        resolve({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        });
      } else {
        reject(new Error('Error getting current position'));
      }
    });
  });
}

export async function saveImage(uri: string) {
  CameraRoll.saveAsset(uri, {type: 'photo', album: 'nocap'});
}

export async function saveImageByUrl(url: string) {
  if (!url.length) {
    return;
  }
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'jpg',
  })
    .fetch('GET', url)
    .then(res => {
      CameraRoll.saveAsset(res.path(), {type: 'photo'});
    });
}
