import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';

import {AppNavigation} from 'navigation/AppNavigation';

import './global.css';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppNavigation />;
}

export default App;
