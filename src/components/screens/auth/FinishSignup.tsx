import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import {BigButton} from 'components/atoms/BigButton';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Logo} from 'assets/images';

type Props = NativeStackScreenProps<RootStackParamList, Screens.FINISH_SIGNUP>;

export const FinishSignup: React.FC<Props> = ({navigation}) => {
  const auth = useAuth();

  useEffect(() => {
    auth.postUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1 px-[16px] mt-[40px] mb-[40px] justify-end gap-[24px]">
        <View className="flex-1 justify-center gap-[8px]">
          <Text className="color-white font-robotoRegular text-[20px]">
            Welcome to
          </Text>

          <View className="flex-row gap-[2px] items-center">
            <Text className="color-white font-robotoMedium text-[36px]">
              nocap
            </Text>
            <Logo />
          </View>
        </View>

        <Text className="font-robotoRegular text-[20px] color-white">
          Let's peep your friends who are already using nocap
        </Text>

        <BigButton
          label="Sync contacts"
          style="white"
          onPress={() => navigation.navigate(Screens.CONTACTS)}
        />
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
