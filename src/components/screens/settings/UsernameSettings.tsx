import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {CheckOrange, CrossOrange} from 'assets/images';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.USERNAME_SETTINGS
>;

export const UsernameSettings: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');

  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      setName(auth.user?.username);
    }
  }, [auth.user]);

  const submit = () => {
    auth.updateUser({username: name});
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-[16px] py-[12px] flex-row justify-between items-center border-b border-grayDark">
        <Pressable onPress={navigation.goBack}>
          <CrossOrange />
        </Pressable>
        <Pressable onPress={submit}>
          <CheckOrange />
        </Pressable>
      </View>

      <View className="px-[16px] gap-[16px] mt-[16px]">
        <View className="gap-[8px]">
          <Text className="font-robotoRegular text-[16px] color-grayLight">
            Name
          </Text>
          <Text className="font-robotoMedium text-[16px] color-white">
            {auth.user?.username}
          </Text>
        </View>

        <View className="w-full h-[1px] bg-grayDark" />

        <View className="gap-[8px]">
          <Text className="font-robotoRegular text-[16px] color-grayLight">
            Enter new name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="font-robotoMedium text-[16px] color-white"
          />
        </View>

        <View className="w-full h-[1px] bg-grayDark" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
