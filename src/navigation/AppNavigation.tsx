import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList, Screens} from 'utils/types/navigation';
import React from 'react';

import {Welcome} from 'components/screens/auth/Welcome';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name={Screens.WELCOME} component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
