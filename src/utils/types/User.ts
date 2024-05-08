import {Timestamp} from 'firebase/firestore';

export type User = {
  id: string;
  username: string;
  phoneNumber: string | null;
  email: string | null;
  birthDate: Timestamp;
  gender: string;
  peeps: string[];
  imageLink: string;
  bio: string;
  albums: {name: string; images: string[]}[];
};
