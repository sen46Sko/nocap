import {Timestamp} from 'firebase/firestore';

import {Album} from 'utils/types/Album';

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
  albums: Album[];
};
