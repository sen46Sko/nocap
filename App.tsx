import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';

import {AppNavigation} from 'navigation/AppNavigation';

import './global.css';
import {AuthProvider} from 'contexts/AuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
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
