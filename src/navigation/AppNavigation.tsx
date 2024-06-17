import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {PermissionsSettings} from 'components/screens/settings/permissions/PermissionsSettings';
import {PermissionDetails} from 'components/screens/settings/permissions/PermissionDetails';
import {BirthDateSettings} from 'components/screens/settings/BirthDateSettings';
import {ProfileSlideView} from 'components/screens/profile/ProfileSlideView';
import {LanguageSettings} from 'components/screens/settings/LanguageSettings';
import {UsernameSettings} from 'components/screens/settings/UsernameSettings';
import {FeedCardDetails} from 'components/screens/FeedCardDetails';
import {GenderSettings} from 'components/screens/settings/GenderSettings';
import {Notifications} from 'components/screens/profile/Notifications';
import {FinishSignup} from 'components/screens/auth/FinishSignup';
import {ImageEditor} from 'components/screens/photoUploading/ImageEditor';
import {ImagePicker} from 'components/screens/photoUploading/ImagePicker';
import {PhoneAuth} from 'components/screens/auth/Auth';
import {BirthDate} from 'components/screens/auth/BirthDate';
import {Username} from 'components/screens/auth/Username';
import {Settings} from 'components/screens/settings/Settings';
import {Contacts} from 'components/screens/auth/Contacts';
import {Welcome} from 'components/screens/auth/Welcome';
import {Peepers} from 'components/screens/profile/Peepers';
import {Profile} from 'components/screens/profile/Profile';
import {Gender} from 'components/screens/auth/Gender';
import {Search} from 'components/screens/Search';
import {Home} from 'components/screens/Home';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {navigationRef} from 'utils/helpers';
import {ImagePosting} from 'components/screens/photoUploading/ImagePosting';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.WELCOME} component={Welcome} />
        <Stack.Screen name={Screens.AUTH} component={PhoneAuth} />
        <Stack.Screen name={Screens.USERNAME} component={Username} />
        <Stack.Screen name={Screens.BIRTH_DATE} component={BirthDate} />
        <Stack.Screen name={Screens.GENDER} component={Gender} />
        <Stack.Screen name={Screens.FINISH_SIGNUP} component={FinishSignup} />
        <Stack.Screen name={Screens.CONTACTS} component={Contacts} />

        <Stack.Screen
          name={Screens.HOME}
          component={Home}
          options={{gestureEnabled: false}}
        />
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
        <Stack.Screen
          name={Screens.NOTIFICATIONS}
          component={Notifications}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name={Screens.PEEPERS}
          component={Peepers}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />

        <Stack.Screen name={Screens.SETTINGS} component={Settings} />
        <Stack.Screen
          name={Screens.USERNAME_SETTINGS}
          component={UsernameSettings}
        />
        <Stack.Screen
          name={Screens.BIRTHDATE_SETTINGS}
          component={BirthDateSettings}
        />
        <Stack.Screen
          name={Screens.GENDER_SETTINGS}
          component={GenderSettings}
        />
        <Stack.Screen
          name={Screens.LANGUAGE_SETTINGS}
          component={LanguageSettings}
        />
        <Stack.Screen
          name={Screens.PERMISSIONS_SETTINGS}
          component={PermissionsSettings}
        />
        <Stack.Screen
          name={Screens.PERMISSION_DETAILS}
          component={PermissionDetails}
        />

        <Stack.Screen
          name={Screens.IMAGE_PICKER}
          component={ImagePicker}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />

        <Stack.Screen
          name={Screens.IMAGE_EDITOR}
          component={ImageEditor}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />

        <Stack.Screen
          name={Screens.IMAGE_POSTING}
          component={ImagePosting}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
