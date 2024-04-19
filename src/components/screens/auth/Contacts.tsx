import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand, Search} from 'assets/images';
import {ContactItem} from 'components/atoms/ContactItem';
import {CustomInput} from 'components/atoms/CustomInput';
import {SmallButton} from 'components/atoms/SmallButton';
import {BigButton} from 'components/atoms/BigButton';

type Props = NativeStackScreenProps<RootStackParamList, Screens.CONTACTS>;

export const Contacts: React.FC<Props> = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const peepListStyle = isExpanded
    ? 'gap-[16px]'
    : 'gap-[16px] h-0 overflow-hidden';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        <View className="flex-1 px-[16px] mt-[40px] mb-[40px] gap-[24px]">
          <View className="flex-row items-center justify-between">
            <Text className="color-orange font-robotoMedium text-[16px]">
              Contacts
            </Text>

            <Pressable onPress={() => setIsExpanded(current => !current)}>
              <Expand />
            </Pressable>
          </View>

          <View className="w-full h-[1px] bg-grayDark" />

          <View className={peepListStyle}>
            <ContactItem name="Van heusen" isPeep={true} />
            <ContactItem name="Rahul K" isPeep={true} />
            <ContactItem name="Varun" isPeep={true} />
          </View>

          <View className="w-full h-[1px] bg-grayDark" />

          <CustomInput
            value={searchQuery}
            setValue={setSearchQuery}
            placeholder="Search"
            Icon={Search}
          />

          <View className="flex-row justify-end">
            <SmallButton label="Invite all" />
          </View>

          <View className="gap-[16px]">
            <ContactItem name="Andrews" isPeep={false} />
            <ContactItem name="Salman Van" isPeep={false} />
            <ContactItem name="Goyal M" isPeep={false} />
            <ContactItem name="Deepak" isPeep={false} />
            <ContactItem name="Iron Man" isPeep={false} />
            <ContactItem name="Sundaram" isPeep={false} />
            <ContactItem name="San Frisco" isPeep={false} />
            <ContactItem name="DanielRodClief" isPeep={false} />
            <ContactItem name="Voxwogan" isPeep={false} />
          </View>
        </View>
      </ScrollView>
      <View className="px-[16px] absolute w-full bottom-[76px]">
        <BigButton label="Jump in!" onPress={() => {}} style="white" />
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
