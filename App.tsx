import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Appearance, StyleSheet} from 'react-native';
// import messaging, {
//   FirebaseMessagingTypes,
// } from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
// import notifee from '@notifee/react-native';

import {PostsProvider} from 'contexts/PostsContext';
import {AuthProvider} from 'contexts/AuthContext';

import {AppNavigation} from 'navigation/AppNavigation';

import './global.css';
import {PermissionsProvider} from 'contexts/PermissionsContext';

function App(): JSX.Element {
  // const onDisplayNotification = useCallback(
  //   async (message: FirebaseMessagingTypes.RemoteMessage) => {
  //     await notifee.requestPermission();

  //     const channelId = await notifee.createChannel({
  //       id: 'default',
  //       name: 'Default Channel',
  //     });

  //     await notifee.displayNotification({
  //       title: message.notification?.title,
  //       body: message.notification?.body,
  //       android: {
  //         channelId,
  //         pressAction: {
  //           id: 'default',
  //         },
  //       },
  //     });
  //   },
  //   [],
  // );

  // useEffect(() => {
  //   messaging().getToken().then(console.log);
  //   messaging().onMessage(onDisplayNotification);
  //   messaging().setBackgroundMessageHandler(onDisplayNotification);
  // }, [onDisplayNotification]);

  useEffect(() => {
    SplashScreen.hide();
    Appearance.setColorScheme('dark');
  }, []);

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <AuthProvider>
        <PostsProvider>
          <PermissionsProvider>
            <AppNavigation />
          </PermissionsProvider>
        </PostsProvider>
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
