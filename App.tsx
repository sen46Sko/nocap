import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';

import {AppNavigation} from 'navigation/AppNavigation';

import './global.css';
import {AuthProvider} from 'contexts/AuthContext';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

export default App;
