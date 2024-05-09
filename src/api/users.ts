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

export async function getPeepers(userId: string) {
  const peepers: string[] = [];

  await firestore()
    .collection('Profiles')
    .where('peeps', 'array-contains', userId)
    .get()
    .then(res => res.forEach(docRef => peepers.push(docRef.id)));

  return peepers;
}

export async function getSuggestedUsers(userId: string) {
  const profilesRef = firestore().collection('Profiles');
  const users: User[] = [];

  await profilesRef
    .doc(userId)
    .get()
    .then(doc => doc.get('peeps'))
    .then(async peepIds => {
      for (const peepId of peepIds as string[]) {
        await profilesRef
          .doc(peepId)
          .get()
          .then(doc => doc.get('peeps'))
          .then(async suggestedPeepIds => {
            for (const suggestedPeepId of suggestedPeepIds as string[]) {
              await profilesRef
                .doc(suggestedPeepId)
                .get()
                .then(res => {
                  if (res.data()?.id !== userId) {
                    users.push(res.data() as User);
                  }
                });
            }
          });
      }
    });

  return users;
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
