export enum Screens {
  WELCOME = 'Welcome',
  PHONE_AUTH = 'PhoneAuth',
  USERNAME = 'Username',
  BIRTH_DATE = 'BirthDate',
  GENDER = 'Gender',
  FINISH_SIGNUP = 'FinishSignup',
  CONTACTS = 'Contacts',
}

export type RootStackParamList = {
  [Screens.WELCOME]: undefined;
  [Screens.PHONE_AUTH]: undefined;
  [Screens.USERNAME]: undefined;
  [Screens.BIRTH_DATE]: undefined;
  [Screens.GENDER]: undefined;
  [Screens.FINISH_SIGNUP]: undefined;
  [Screens.CONTACTS]: undefined;
};
