import {Alert, Linking, PermissionsAndroid, Platform, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Contact, getAll} from 'react-native-contacts';

import {CustomInput} from 'components/atoms/CustomInput';
import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {ContactItem} from 'components/molecules/ContactItem';
import {If} from 'components/atoms/If';

import {sortContacts} from 'utils/helpers';

import {SearchGray} from 'assets/images';

export const ContactsList = () => {
  const [registeredContacts, setRegisteredContacts] = useState<Contact[]>([]);
  const [unregisteredContacts, setUnregisteredContacts] = useState<Contact[]>(
    [],
  );
  // const [isLoading, setIsLoading] = useState();
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
            .catch(error => {
              console.log(error);
              Alert.alert(error.mesage);
            });
        }
      });
    } else {
      getAll()
        .then(res => sortContacts(res))
        .then(res => {
          setRegisteredContacts(res.registered);
          setUnregisteredContacts(res.unregistered);
        })
        .catch(error => {
          console.log(error);
          Alert.alert(error.mesage);
        });
    }
  }, []);

  const filteredContacts = unregisteredContacts.filter(contact =>
    Platform.OS === 'ios'
      ? contact.givenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.familyName.toLowerCase().includes(searchQuery.toLowerCase())
      : contact.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
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
      const url = `sms://${phoneNumber}?body=${message}`;
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Unsupported url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      });
    }
  };

  return (
    <View className="px-[16px] gap-[16px] pt-[16px]">
      <If condition={!!registeredContacts.length}>
        <View className="gap-[16px]">
          {registeredContacts.map(contact => (
            <ContactItem
              key={contact.givenName + contact.familyName}
              name="ASdasdasdasdas"
              buttonLabel="Peep"
              photoUri={contact.thumbnailPath || ''}
              onPress={() => {}}
            />
          ))}
          <ContactItem
            name="Asdsd"
            buttonLabel="Peep"
            photoUri=""
            onPress={() => {}}
          />
          <ContactItem
            name="asdfasdfasdfasdfasdf"
            buttonLabel="Peep"
            photoUri=""
            onPress={() => {}}
          />
        </View>
      </If>

      <If condition={!!registeredContacts.length}>
        <View className="w-full h-[1px] bg-grayDark" />
      </If>

      <CustomInput
        value={searchQuery}
        setValue={setSearchQuery}
        placeholder="Search"
        Icon={SearchGray}
      />

      <View className="flex-row justify-end">
        <SmallButton label="Invite all" onPress={() => {}} />
      </View>

      <View className="gap-[16px]">
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.givenName + contact.familyName}
            name={`${contact.givenName} ${contact.familyName || ''}`}
            buttonLabel="Invite"
            photoUri={contact.thumbnailPath || ''}
            onPress={() => sendMessage(contact.phoneNumbers[0].number)}
          />
        ))}
      </View>
    </View>
  );
};
