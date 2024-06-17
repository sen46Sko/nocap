import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';

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

export async function uploadPost(post: Omit<Post, 'id'>) {
  const {imageLink} = post;
  const filename = imageLink.substring(imageLink.lastIndexOf('/') + 1);
  const uploadUri =
    Platform.OS === 'ios' ? imageLink.replace('file://', '') : imageLink;

  await storage().ref(filename).putFile(uploadUri);

  const storedImageUrl = await storage().ref(filename).getDownloadURL();
  const newPost = {...post, imageLink: storedImageUrl};

  return firestore()
    .collection('Posts')
    .add(newPost)
    .then(docRef => ({...newPost, id: docRef.id}));
}
