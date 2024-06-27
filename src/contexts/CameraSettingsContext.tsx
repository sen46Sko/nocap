import React, {createContext, useContext, ReactNode, useState} from 'react';

interface CameraSettingsContextType {
  location: boolean;
  setLocation: (status: boolean) => void;
  saveToGalery: boolean;
  setSaveToGalery: (status: boolean) => void;
  deviceInfo: boolean;
  setDeviceInfo: (status: boolean) => void;
  highQuality: boolean;
  setHighQuality: (status: boolean) => void;
}

const CameraSettingsContext = createContext<CameraSettingsContextType>({
  location: false,
  setLocation: () => {},
  saveToGalery: false,
  setSaveToGalery: () => {},
  deviceInfo: false,
  setDeviceInfo: () => {},
  highQuality: false,
  setHighQuality: () => {},
});

export const CameraSettingsProvider = ({children}: {children: ReactNode}) => {
  const [location, setLocation] = useState(false);
  const [saveToGalery, setSaveToGalery] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(false);
  const [highQuality, setHighQuality] = useState(false);

  return (
    <CameraSettingsContext.Provider
      value={{
        location,
        setLocation,
        saveToGalery,
        setSaveToGalery,
        deviceInfo,
        setDeviceInfo,
        highQuality,
        setHighQuality,
      }}>
      {children}
    </CameraSettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(CameraSettingsContext);
};
