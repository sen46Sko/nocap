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
  [Screens.FEED_CARD_DETAILS]: undefined;

  [Screens.SEARCH]: undefined;

  [Screens.PROFILE]: {type: 'my' | 'not my'};
  [Screens.PROFILE_SLIDE_VIEW]: undefined;
};
