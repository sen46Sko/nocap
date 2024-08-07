import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {LoaderSpinner} from 'components/organisms/LoaderSpinner';
import {CustomInput} from 'components/atoms/CustomInput';
import {BigButton} from 'components/atoms/buttons/BigButton';
import {If} from 'components/atoms/If';

import {useAuth} from 'contexts/AuthContext';

import {isUsernameTaken, isUsernameValid} from 'utils/helpers/auth';
import {RootStackParamList, Screens} from 'utils/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, Screens.USERNAME>;

export const Username: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();

  const saveUsername = async () => {
    setIsLoading(true);
    const isValid = isUsernameValid(username);

    if (!isValid) {
      Alert.alert('The username is invalid');
      setIsLoading(false);
      return;
    }

    const isTaken = await isUsernameTaken(username);

    if (isTaken) {
      Alert.alert('The username is taken');
      setIsLoading(false);
      return;
    }

    auth.setLocalUser(current => ({...current, username: username}));
    navigation.navigate(Screens.BIRTH_DATE);
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View className="flex-1 px-[16px] mt-[83px] mb-[40px] justify-between">
          <View className="gap-[24px] w-full items-center">
            <Text className="font-robotoMedium text-[36px] color-white">
              natopis
            </Text>

            <View className="w-full gap-[16px]">
              <Text className="font-robotoMedium text-[16px] color-white">
                Sign up
              </Text>

              <View className="gap-[24px]">
                <CustomInput
                  value={username}
                  setValue={setUsername}
                  placeholder="Set username"
                />
              </View>
            </View>

            <BigButton
              label="Continue"
              style="white"
              onPress={saveUsername}
              disabled={!username}
            />
          </View>

          <View className="absolote bottom-30">
            <Text className="font-robotoRegular color-grayLight">
              By signing up, you agree to the
            </Text>

            <View className="flex-row gap-[2px]">
              <Text className="font-robotoRegular color-grayLight">
                Nocap's
              </Text>

              <Text className="font-robotoMedium color-white">
                Terms of Use and Privacy Policy
              </Text>
            </View>
          </View>
        </View>

        <If condition={isLoading}>
          <LoaderSpinner />
        </If>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
