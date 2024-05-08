import {Alert, Pressable, Share, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {CustomInput} from 'components/atoms/CustomInput';
import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {BigButton} from 'components/atoms/buttons/BigButton';

import {Pencil} from 'assets/images';
import {useAuth} from 'contexts/AuthContext';

type Props = {};

export const MyProfileMenu: React.FC<Props> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');

  const auth = useAuth();

  const onShare = () => {
    try {
      Share.share(
        {
          url: 'https://www.google.com',
        },
        {tintColor: '#000000'},
      );
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const updateBio = () => {
    setIsEditing(false);
    auth.updateUser({bio});
  };

  useEffect(() => {
    setBio(auth.user?.bio || '');
  }, [auth.user?.bio]);

  return (
    <View className="gap-[24px]">
      <View className="flex-row gap-[14px] justify-end">
        <Pressable
          className="bg-grayDark h-[27px] w-[27px] rounded-full items-center justify-center"
          onPress={() => setIsEditing(true)}>
          <Pencil />
        </Pressable>
        <SmallButton label="Save" onPress={updateBio} />
      </View>

      <View className="gap-[16px]">
        <Text className=" font-robotoMedium text-[16px] color-grayLight">
          Bio
        </Text>
        {isEditing ? (
          <CustomInput
            value={bio}
            setValue={setBio}
            placeholder="Set you bio"
          />
        ) : (
          <Text className=" font-robotoMedium text-[16px] color-grayLight">
            {bio}
          </Text>
        )}
      </View>

      <BigButton style="gray" label="Share profile" onPress={onShare} />
      <BigButton
        style="transparentGreen"
        label="Invite friends"
        onPress={() => {}}
      />
    </View>
  );
};
