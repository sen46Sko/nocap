import {createNavigationContainerRef} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {Contact} from 'react-native-contacts';

import {RootStackParamList} from 'utils/types/navigation';

import {getAllUsers} from 'api/users';

export const screenWidth = Dimensions.get('window').width;

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: any, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

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

export const sortContacts = async (contacts: Contact[]) => {
  const fetchedUsers = await getAllUsers();
  const registered: Contact[] = [];
  const unregistered: Contact[] = [];

  for (const contact of contacts) {
    if (!contact.phoneNumbers[0].number) {
      unregistered.push(contact);
      continue;
    }

    const isRegistered = fetchedUsers.some(user =>
      user.phoneNumber?.includes(
        contact.phoneNumbers[0].number.replaceAll(/\D/g, ''),
      ),
    );

    if (isRegistered) {
      registered.push(contact);
    } else {
      unregistered.push(contact);
    }
  }

  return {registered, unregistered};
};

export const isUsernameValid = (username: string) => {
  const regex = /^[a-zA-Z1-9.\-_]+$/g;
  const isValid = regex.test(username);

  if (!isValid) {
    return false;
  }

  return true;
};

export const isUsernameTaken = async (username: string) => {
  const fetchedUsers = await getAllUsers();

  const isNameTaken = fetchedUsers.some(user => user.username === username);

  if (isNameTaken) {
    return true;
  }

  return false;
};

export const isBirthDateValid = (date: Date) => {
  const dateAtMidnight = new Date(date);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  dateAtMidnight.setHours(0, 0, 0, 0);

  return dateAtMidnight < today;
};
