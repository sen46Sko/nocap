import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {PhoneAuth} from 'components/screens/auth/PhoneAuth';
import {BirthDate} from 'components/screens/auth/BirthDate';
import {Username} from 'components/screens/auth/Username';
import {Welcome} from 'components/screens/auth/Welcome';
import {Gender} from 'components/screens/auth/Gender';

import {RootStackParamList, Screens} from 'utils/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.WELCOME} component={Welcome} />
        <Stack.Screen name={Screens.PHONE_AUTH} component={PhoneAuth} />
        <Stack.Screen name={Screens.USERNAME} component={Username} />
        <Stack.Screen name={Screens.BIRTH_DATE} component={BirthDate} />
        <Stack.Screen name={Screens.GENDER} component={Gender} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
