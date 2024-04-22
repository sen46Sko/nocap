import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand, Search} from 'assets/images';
import {ContactItem} from 'components/atoms/ContactItem';
import {CustomInput} from 'components/atoms/CustomInput';
import {SmallButton} from 'components/atoms/SmallButton';
import {BigButton} from 'components/atoms/BigButton';
import {Contact, getAll} from 'react-native-contacts';

type Props = NativeStackScreenProps<RootStackParamList, Screens.CONTACTS>;

export const Contacts: React.FC<Props> = ({navigation}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getAll()
      .then(setContacts)
      .catch(error => Alert.alert(error.mesage));
  }, []);

  const peepListStyle = isExpanded ? 'gap-[16px]' : 'gap-[16px]';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        <View className="flex-1 px-[16px] mt-[40px] mb-[40px] gap-[16px]">
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
            <ContactItem name="Van heusen" isPeep={true} photoUri="" />
            <ContactItem name="Rahul K" isPeep={true} photoUri="" />
            <ContactItem name="Varun" isPeep={true} photoUri="" />
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
            {contacts.map(contact => (
              <ContactItem
                key={contact.givenName}
                name={`${contact.givenName} ${contact.familyName || ''}`}
                isPeep={false}
                photoUri={contact.thumbnailPath || ''}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="px-[16px] absolute w-full bottom-[76px]">
        <BigButton
          label="Jump in!"
          onPress={() => navigation.navigate(Screens.HOME)}
          style="white"
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
