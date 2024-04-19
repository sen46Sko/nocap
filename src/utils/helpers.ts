import {Dimensions} from 'react-native';

export const screenWidth = Dimensions.get('window').width;

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
