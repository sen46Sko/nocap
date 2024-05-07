import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

import {Post} from 'utils/types/Post';

export async function getPosts() {
  const posts: Post[] = [];

  await firestore()
    .collection('Posts')
    .get()
    .then(res =>
      res.forEach(docRef =>
        posts.push({...docRef.data(), id: docRef.id} as Post),
      ),
    );

  return posts;
}

export async function setPostLoving(status: 'love' | 'unlove', postId: string) {
  return functions().httpsCallable('setPostLoving')({status, postId});
}

export async function viewPost(postId: string) {
  return functions().httpsCallable('viewPost')({postId});
}
