import {createNavigationContainerRef} from '@react-navigation/native';
import {getAllUsers} from 'api/users';
import {Dimensions} from 'react-native';
import {Contact} from 'react-native-contacts';

import {RootStackParamList} from 'utils/types/navigation';

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
    const isRegistered = fetchedUsers.some(user =>
      user.phoneNumber.includes(
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
