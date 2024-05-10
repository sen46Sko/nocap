import {User} from 'utils/types/User';

export enum Screens {
  WELCOME = 'Welcome',
  AUTH = 'Auth',
  USERNAME = 'Username',
  BIRTH_DATE = 'BirthDate',
  GENDER = 'Gender',
  FINISH_SIGNUP = 'FinishSignup',
  CONTACTS = 'Contacts',

  HOME = 'Home',
  FEED_CARD_DETAILS = 'FeedCardDetails',

  SEARCH = 'Search',

  PROFILE = 'Profile',
  PROFILE_SLIDE_VIEW = 'ProfileSlideView',
  NOTIFICATIONS = 'Notifications',
  PEEPERS = 'Peepers',

  SETTINGS = 'Settings',
  USERNAME_SETTINGS = 'UsernameSettings',
  BIRTHDATE_SETTINGS = 'BirthDateSettings',
  GENDER_SETTINGS = 'GenderSettings',
  LANGUAGE_SETTINGS = 'LanguageSettings',
}

export type RootStackParamList = {
  [Screens.WELCOME]: undefined;
  [Screens.AUTH]: {type: 'login' | 'signup'};
  [Screens.USERNAME]: undefined;
  [Screens.BIRTH_DATE]: undefined;
  [Screens.GENDER]: undefined;
  [Screens.FINISH_SIGNUP]: undefined;
  [Screens.CONTACTS]: undefined;

  [Screens.HOME]: undefined;
  [Screens.FEED_CARD_DETAILS]: {postId: string};

  [Screens.SEARCH]: undefined;

  [Screens.PROFILE]: {userId: string};
  [Screens.PROFILE_SLIDE_VIEW]: {user: User; initialIndex: number};
  [Screens.NOTIFICATIONS]: undefined;
  [Screens.PEEPERS]: {userId: string};

  [Screens.SETTINGS]: undefined;
  [Screens.USERNAME_SETTINGS]: undefined;
  [Screens.BIRTHDATE_SETTINGS]: undefined;
  [Screens.GENDER_SETTINGS]: undefined;
  [Screens.LANGUAGE_SETTINGS]: undefined;
};
