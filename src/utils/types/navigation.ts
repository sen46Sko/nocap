import {Post} from './Post';

export enum Screens {
  WELCOME = 'Welcome',
  PHONE_AUTH = 'PhoneAuth',
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
}

export type RootStackParamList = {
  [Screens.WELCOME]: undefined;
  [Screens.PHONE_AUTH]: {type: 'login' | 'signup'};
  [Screens.USERNAME]: undefined;
  [Screens.BIRTH_DATE]: undefined;
  [Screens.GENDER]: undefined;
  [Screens.FINISH_SIGNUP]: undefined;
  [Screens.CONTACTS]: undefined;

  [Screens.HOME]: undefined;
  [Screens.FEED_CARD_DETAILS]: {post: Post};

  [Screens.SEARCH]: undefined;

  [Screens.PROFILE]: {userId: string};
  [Screens.PROFILE_SLIDE_VIEW]: {type: 'my' | 'not my'};
  [Screens.NOTIFICATIONS]: undefined;
  [Screens.PEEPERS]: undefined;
};
