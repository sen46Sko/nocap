import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {BigButton} from 'components/atoms/buttons/BigButton';

import {useAuth} from 'contexts/AuthContext';

import {RootStackParamList, Screens} from 'utils/types/navigation';
import {GenderPicker} from 'components/organisms/GenderPicker';

type Props = NativeStackScreenProps<RootStackParamList, Screens.GENDER>;

export const Gender: React.FC<Props> = ({navigation}) => {
  const [gender, setGender] = useState('');
  const [customGender, setCustomGender] = useState('');

  const auth = useAuth();

  const saveGender = () => {
    auth.setLocalUser(current => ({
      ...current,
      gender: customGender || gender,
    }));
    navigation.navigate(Screens.FINISH_SIGNUP);
  };

  const selectItem = (item: string) => {
    setCustomGender('');
    setGender(item);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View className="flex-1 px-[16px] mt-[40px] mb-[40px] justify-between">
          <View className="mt-[16px]">
            <GenderPicker
              gender={gender}
              selectGender={selectItem}
              customGender={customGender}
              setCustomGender={setCustomGender}
            />
          </View>

          <View className="items-center gap-[80px]">
            <BigButton
              label="Create account"
              style="white"
              onPress={saveGender}
              disabled={!gender || (gender === 'Custom' && !customGender)}
            />
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
