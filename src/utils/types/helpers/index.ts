import {createNavigationContainerRef} from '@react-navigation/native';
import {Dimensions, Platform} from 'react-native';
import {Contact} from 'react-native-contacts';

import {getAllUsers} from 'api/users';

import {RootStackParamList} from 'utils/types/navigation';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: any, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const sortContacts = async (contacts: Contact[]) => {
  const fetchedUsers = await getAllUsers();
  const registered: Contact[] = [];
  const unregistered: Contact[] = [];

  for (const contact of contacts) {
    if (!contact.phoneNumbers.length) {
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

  const sortingFunc = (a: Contact, b: Contact) =>
    Platform.OS === 'ios'
      ? a.givenName.localeCompare(b.givenName)
      : a.displayName.localeCompare(b.displayName);

  return {
    registered: [...registered].sort(sortingFunc),
    unregistered: [...unregistered].sort(sortingFunc),
  };
};

export const getHighestIdFromArray = (array: {id: number}[]) => {
  if (!array.length) {
    return 0;
  }

  return Math.max(...array.map(item => item.id));
};
