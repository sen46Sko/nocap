import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React from 'react';

import {BigButton} from 'components/atoms/BigButton';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, Screens.HOME>;

export const Home: React.FC<Props> = ({navigation}) => {
  const auth = useAuth();

  const signOut = () => {
    auth.signOut().then(() => navigation.navigate(Screens.WELCOME));
  };

  const deleteProfile = () => {
    auth.deleteUser().then(() => navigation.navigate(Screens.WELCOME));
  };

  return (
    <View className="bg-black items-center justify-center flex-1 px-[16px] gap-[20px]">
      <BigButton label="Log out" style="white" onPress={signOut} />
      <BigButton label="Delete profile" style="white" onPress={deleteProfile} />
      <BigButton
        label="Contacts"
        style="white"
        onPress={() => navigation.navigate(Screens.CONTACTS)}
      />
    </View>
  );
};
