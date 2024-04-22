import {createNavigationContainerRef} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {RootStackParamList} from './types/navigation';

export const screenWidth = Dimensions.get('window').width;

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export const getDateString = (date: Date) =>
  date.toLocaleDateString('wo').split('-').join(' - ');

export const getAge = (birthDate: Date) => {
  const today = new Date();
  var years = today.getFullYear() - birthDate.getFullYear();
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    years--;
  }
  return years;
};
