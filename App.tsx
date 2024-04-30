import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Appearance, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {AppNavigation} from 'navigation/AppNavigation';

import {AuthProvider} from 'contexts/AuthContext';

import './global.css';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    Appearance.setColorScheme('dark');
  }, []);

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});

export default App;
