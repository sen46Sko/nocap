import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import {AppState, Platform} from 'react-native';
import {
  PERMISSIONS,
  checkMultiple,
  checkNotifications,
} from 'react-native-permissions';

interface PermissionsContextType {
  camera: string;
  contacts: string;
  location: string;
  microphone: string;
  notifications: string;
}

const PermissionsContext = createContext<PermissionsContextType>({
  camera: '',
  contacts: '',
  location: '',
  microphone: '',
  notifications: '',
});

export const PermissionsProvider = ({children}: {children: ReactNode}) => {
  const [permissions, setPermissions] = useState({
    camera: 'denied',
    contacts: 'denied',
    location: 'denied',
    microphone: 'denied',
    notifications: 'denied',
  });

  const updatePermissions = useCallback(() => {
    if (Platform.OS === 'ios') {
      checkMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.CONTACTS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.MICROPHONE,
      ]).then(res =>
        setPermissions(current => ({
          ...current,
          camera: res['ios.permission.CAMERA'],
          contacts: res['ios.permission.CONTACTS'],
          location: res['ios.permission.LOCATION_WHEN_IN_USE'],
          microphone: res['ios.permission.MICROPHONE'],
        })),
      );
    } else {
      checkMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_CONTACTS,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      ]).then(res =>
        setPermissions(current => ({
          ...current,
          camera: res['android.permission.CAMERA'],
          contacts: res['android.permission.READ_CONTACTS'],
          location: res['android.permission.ACCESS_COARSE_LOCATION'],
          microphone: res['android.permission.RECORD_AUDIO'],
        })),
      );
    }

    checkNotifications().then(res =>
      setPermissions(current => ({...current, notifications: res.status})),
    );
  }, []);

  useEffect(() => {
    updatePermissions();
    AppState.addEventListener('change', updatePermissions);
  }, [updatePermissions]);
  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  return useContext(PermissionsContext);
};
