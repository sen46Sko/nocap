import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
  Text,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Contact, getAll} from 'react-native-contacts';

import {ContactItem} from 'components/atoms/ContactItem';
import {CustomInput} from 'components/atoms/CustomInput';
import {SmallButton} from 'components/atoms/SmallButton';
import {BigButton} from 'components/atoms/BigButton';

import {RootStackParamList, Screens} from 'utils/types/navigation';

import {Expand, Search} from 'assets/images';
import SendIntentAndroid from 'react-native-send-intent';
import {sortContacts} from 'utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, Screens.CONTACTS>;

export const Contacts: React.FC<Props> = ({navigation}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [registeredContacts, setRegisteredContacts] = useState<Contact[]>([]);
  const [unregisteredContacts, setUnregisteredContacts] = useState<Contact[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'ContactsList app would like to access your contacts.',
        buttonPositive: 'Accept',
      }).then(value => {
        if (value === 'granted') {
          getAll()
            .then(res => sortContacts(res))
            .then(res => {
              setRegisteredContacts(res.registered);
              setUnregisteredContacts(res.unregistered);
            })
            .catch(error => Alert.alert(error.mesage));
        }
      });
    } else {
      getAll()
        .then(sortContacts)
        .then(res => {
          setRegisteredContacts(res.registered);
          setUnregisteredContacts(res.unregistered);
        })
        .catch(error => Alert.alert(error.mesage));
    }
  }, []);

  const peepListStyle = isExpanded ? 'gap-[16px]' : 'gap-[16px]';

  const filteredContacts = unregisteredContacts.filter(
    contact =>
      contact.givenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.familyName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sendMessage = (phoneNumber: string) => {
    const message =
      "Hello, I've found a cool app to share your photos. Check it by the link: https://www.google.com";

    if (Platform.OS === 'ios') {
      const url = `sms:${phoneNumber}?body=${message}`;
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Unsupported url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      });
    } else {
      SendIntentAndroid.sendSms(phoneNumber, message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        <View className="flex-1 px-[16px] mt-[40px] mb-[100px] gap-[16px]">
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
            {registeredContacts.slice(0, isExpanded ? -1 : 3).map(contact => (
              <ContactItem
                key={contact.givenName + contact.familyName}
                name={`${contact.givenName} ${contact.familyName || ''}`}
                isPeep={true}
                photoUri={contact.thumbnailPath || ''}
                onPress={() => {}}
              />
            ))}
          </View>

          <View className="w-full h-[1px] bg-grayDark" />

          <CustomInput
            value={searchQuery}
            setValue={setSearchQuery}
            placeholder="Search"
            Icon={Search}
          />

          <View className="flex-row justify-end">
            <SmallButton label="Invite all" onPress={() => {}} />
          </View>

          <View className="gap-[16px]">
            {filteredContacts.map(contact => (
              <ContactItem
                key={contact.givenName + contact.familyName}
                name={`${contact.givenName} ${contact.familyName || ''}`}
                isPeep={false}
                photoUri={contact.thumbnailPath || ''}
                onPress={() => sendMessage(contact.phoneNumbers[0].number)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="px-[16px] absolute w-full bottom-[40px]">
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
