import GeoLocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export const getDeviceInfo = async () => {
  const deviceName = await DeviceInfo.getDeviceName();
  const manufacturer = await DeviceInfo.getManufacturer();
  return `${manufacturer} ${deviceName}`;
};

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
