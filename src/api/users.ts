import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

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

export async function getAllUsers() {
  return await firestore()
    .collection('Profiles')
    .get()
    .then(querySnapshot => {
      const data: any[] = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      return data;
    });
}

export async function setUserPeeping(
  status: 'peep' | 'unpeep',
  userId: string,
) {
  return functions().httpsCallable('setUserPeeping')({status, userId});
}

export async function getPeepersCount(userId: string) {
  return firestore()
    .collection('Profiles')
    .where('peeps', 'array-contains', userId)
    .count()
    .get()
    .then(res => res.data().count);
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
