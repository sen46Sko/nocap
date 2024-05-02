import firestore from '@react-native-firebase/firestore';
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
