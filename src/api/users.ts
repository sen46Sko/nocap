import firestore from '@react-native-firebase/firestore';

import {User} from 'utils/types/User';

export async function getUserIfExists(userId: string) {
  return firestore()
    .collection('Profiles')
    .doc(userId)
    .get()
    .then(userDoc => {
      if (userDoc.exists) {
        return userDoc.data() as User;
      }

      return null;
    });
}

export async function createUser(user: User) {
  return firestore().collection('Profiles').doc(user.id).set(user);
}

export async function editUser(user: User) {
  return firestore().collection('Profiles').doc(user.id).update(user);
}

export async function removeUser(user: User) {
  return firestore().collection('Profiles').doc(user.id).delete();
}
