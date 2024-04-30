import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {ProfileSlideView} from 'components/screens/ProfileSlideView';
import {FeedCardDetails} from 'components/screens/FeedCardDetails';
import {FinishSignup} from 'components/screens/auth/FinishSignup';
import {PhoneAuth} from 'components/screens/auth/PhoneAuth';
import {BirthDate} from 'components/screens/auth/BirthDate';
import {Username} from 'components/screens/auth/Username';
import {Contacts} from 'components/screens/auth/Contacts';
import {Welcome} from 'components/screens/auth/Welcome';
import {Profile} from 'components/screens/Profile';
import {Gender} from 'components/screens/auth/Gender';
import {Search} from 'components/screens/Search';
import {Home} from 'components/screens/Home';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {navigationRef} from 'utils/helpers';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.WELCOME} component={Welcome} />
        <Stack.Screen name={Screens.PHONE_AUTH} component={PhoneAuth} />
        <Stack.Screen name={Screens.USERNAME} component={Username} />
        <Stack.Screen name={Screens.BIRTH_DATE} component={BirthDate} />
        <Stack.Screen name={Screens.GENDER} component={Gender} />
        <Stack.Screen name={Screens.FINISH_SIGNUP} component={FinishSignup} />
        <Stack.Screen name={Screens.CONTACTS} component={Contacts} />

        <Stack.Screen name={Screens.HOME} component={Home} />
        <Stack.Screen
          name={Screens.FEED_CARD_DETAILS}
          component={FeedCardDetails}
          options={{
            animation: 'none',
          }}
        />

        <Stack.Screen
          name={Screens.SEARCH}
          component={Search}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />

        <Stack.Screen
          name={Screens.PROFILE}
          component={Profile}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name={Screens.PROFILE_SLIDE_VIEW}
          component={ProfileSlideView}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
