import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {CustomInput} from 'components/atoms/CustomInput';
import {CustomButton} from 'components/atoms/CustomButton';

export const Username = () => {
  const [username, setUsername] = useState('');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View className="flex-1 px-[16px] mt-[83px] justify-between">
          <View className="gap-[24px] w-full items-center">
            <Text className="font-robotoMedium text-[36px] color-white">
              nocap
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
            <CustomButton
              label="Create account"
              style="white"
              onPress={() => {}}
            />
          </View>

          <View>
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
