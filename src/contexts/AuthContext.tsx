import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from 'react';

import {
  getUserIfExists,
  setUserPeeping,
  createUser,
  removeUser,
  editUser,
  updateProfileImage,
} from 'api/users';

import {navigate} from 'utils/helpers';
import {Screens} from 'utils/types/navigation';
import {User} from 'utils/types/User';

// import {createImage, deleteImage} from 'api/photos';

import {GOOGLE_CLIENT_ID} from '@env';
// import {requestNotifications} from 'react-native-permissions';

interface AuthContextType {
  signInWithGoogle: () => Promise<FirebaseAuthTypes.UserCredential | undefined>;
  sendCodeToSMS: (phoneNumber: string) => Promise<void>;
  setLocalUser: React.Dispatch<React.SetStateAction<Partial<User> | null>>;
  //   uploadImage: (imageUrl: string) => Promise<string | undefined>;
  //   refetchUser: () => Promise<void>;
  verifyCode: (
    code: string,
  ) => Promise<FirebaseAuthTypes.UserCredential | null | undefined>;
  updateUser: (updatedInfo: Partial<User>) => Promise<void>;
  deleteUser: () => Promise<void>;
  setPeeping: (status: 'peep' | 'unpeep', userId: string) => Promise<void>;
  localUser: Partial<User> | null;
  postUser: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfilePhoto: (uri: string) => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  signInWithGoogle: async () => undefined,
  sendCodeToSMS: async () => {},
  setLocalUser: () => {},
  //   uploadImage: async () => undefined,
  verifyCode: async () => undefined,
  //   refetchUser: async () => undefined,
  updateUser: async () => {},
  deleteUser: async () => {},
  setPeeping: async () => {},
  localUser: null,
  postUser: async () => {},
  signOut: async () => {},
  user: null,
  updateProfilePhoto: async () => {},
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [localUser, setLocalUser] = useState<Partial<User> | null>(null);
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const fetchedUser = await getUserIfExists(currentUser.uid);

        if (fetchedUser) {
          setUser(fetchedUser);
          setLocalUser(fetchedUser);

          // requestNotifications(['alert', 'sound']);

          navigate(Screens.HOME);
        } else {
          const {phoneNumber, email} = currentUser;

          setLocalUser({
            id: currentUser.uid,
            phoneNumber,
            email,
          });

          if (email || phoneNumber) {
            navigate(Screens.USERNAME);
          }
        }
      }
    });

    return subscriber;
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
    });
  }, []);

  const postUser = useCallback(async () => {
    if (!localUser) {
      return;
    }
    const newUser = {
      ...localUser,
      bio: '',
      imageLink: '',
      peeps: [],
      albums: [],
    } as User;

    setLocalUser(newUser);
    setUser(newUser);
    await createUser(newUser);
  }, [localUser]);

  const updateProfilePhoto = async (uri: string) => {
    if (!user) {
      return;
    }
    const newImageLink = await updateProfileImage(user, uri);

    setUser(current =>
      current ? {...current, imageLink: newImageLink} : current,
    );
  };

  const updateUser = useCallback(
    async (updatedInfo: Partial<User>) => {
      if (!user) {
        return;
      }

      const newUser = {
        ...user,
        ...updatedInfo,
      } as User;
      setUser(newUser);

      return editUser(newUser);
    },
    [user],
  );

  const setPeeping = useCallback(
    async (status: 'peep' | 'unpeep', userId: string) => {
      if (!user) {
        return;
      }

      setUser(current => {
        const newUser = {...current} as User;

        if (status === 'peep') {
          const newPeeps = [...user.peeps, userId];
          newUser.peeps = newPeeps;
        } else {
          const newPeeps = user.peeps.filter(id => id !== userId);
          newUser.peeps = newPeeps;
        }

        return newUser;
      });

      await setUserPeeping(status, userId);
    },
    [user],
  );

  const signInWithGoogle = useCallback(async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }, []);

  const sendCodeToSMS = useCallback(async (phoneNumber: string) => {
    const confirmation = await auth()
      .signInWithPhoneNumber(phoneNumber)
      .catch(error => {
        throw error;
      });

    setConfirm(confirmation);
  }, []);

  const verifyCode = useCallback(
    async (code: string) => {
      if (!confirm) {
        throw new Error('Please, enter phone number first');
      }
      return confirm.confirm(code);
    },
    [confirm],
  );

  const signOut = useCallback(async () => {
    try {
      await auth().signOut();
      setUser(null);
      setLocalUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, []);

  const deleteUser = useCallback(async () => {
    try {
      if (user) {
        await removeUser(user);
      }
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [signOut, user]);

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        sendCodeToSMS,
        setLocalUser,
        updateProfilePhoto,
        // uploadImage,
        verifyCode,
        updateUser,
        setPeeping,
        deleteUser,
        localUser,
        postUser,
        signOut,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
