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

import {navigate} from 'utils/helpers';
import {User} from 'utils/types/User';
import {Screens} from 'utils/types/navigation';

import {createUser, getUserIfExists} from 'api/users';
// import {createImage, deleteImage} from 'api/photos';

import {GOOGLE_CLIENT_ID} from '@env';

interface AuthContextType {
  signInWithGoogle: () => Promise<FirebaseAuthTypes.UserCredential | undefined>;
  sendCodeToSMS: (phoneNumber: string) => Promise<void>;
  setLocalUser: React.Dispatch<React.SetStateAction<Partial<User> | null>>;
  //   uploadImage: (imageUrl: string) => Promise<string | undefined>;
  //   refetchUser: () => Promise<void>;
  verifyCode: (
    code: string,
  ) => Promise<FirebaseAuthTypes.UserCredential | null | undefined>;
  //   updateUser: (updatedInfo: Partial<UserDocument>) => Promise<void>;
  //   deleteUser: () => Promise<void>;
  localUser: Partial<User> | null;
  postUser: () => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  signInWithGoogle: async () => undefined,
  sendCodeToSMS: async () => {},
  setLocalUser: () => {},
  //   uploadImage: async () => undefined,
  verifyCode: async () => undefined,
  //   refetchUser: async () => undefined,
  //   updateUser: async () => {},
  //   deleteUser: async () => {},
  localUser: null,
  postUser: async () => {},
  signOut: async () => {},
  user: null,
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [localUser, setLocalUser] = useState<Partial<User> | null>(null);
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async currentUser => {
      console.log('🚀 ~ subscriber ~ currentUser:', currentUser);
      if (currentUser) {
        const fetchedUser = await getUserIfExists(currentUser.uid);

        if (fetchedUser) {
          setUser(fetchedUser);
          setLocalUser(fetchedUser);

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
    } as User;

    setLocalUser(newUser);
    setUser(newUser);
    await createUser(newUser);
  }, [localUser]);

  //   const updateUser = useCallback(
  //     async (updatedInfo: Partial<UserDocument>) => {
  //       if (user) {
  //         const newUser = {
  //           ...user,
  //           ...updatedInfo,
  //         } as UserDocument;
  //         setUser(newUser);

  //         return editUser(newUser);
  //       }
  //     },
  //     [user],
  //   );

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

  //   const deleteUser = useCallback(async () => {
  //     try {
  //       if (user) {
  //         await removeUser(user);
  //       }
  //       if (user?.imageLink) {
  //         await deleteImage(user.imageLink);
  //       }
  //       await signOut();
  //     } catch (error) {
  //       console.error('Sign out error:', error);
  //     }
  //   }, [signOut, user]);

  //   const uploadImage = useCallback(
  //     async (imageUrl: string) => {
  //       if (user?.imageLink) {
  //         await deleteImage(user.imageLink);
  //       }

  //       try {
  //         return createImage(imageUrl);
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     },
  //     [user?.imageLink],
  //   );

  //   const refetchUser = useCallback(async () => {
  //     if (!user) {
  //       return;
  //     }

  //     const fetchedUser = await getUserIfExists(user.id);

  //     if (fetchedUser) {
  //       setUser(fetchedUser);
  //       setLocalUser(fetchedUser);
  //     }
  //   }, [user]);

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        sendCodeToSMS,
        setLocalUser,
        // uploadImage,
        verifyCode,
        // refetchUser,
        // updateUser,
        // deleteUser,
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
