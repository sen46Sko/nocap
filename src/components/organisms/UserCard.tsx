import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';

import {useAuth} from 'contexts/AuthContext';

import {User} from 'utils/types/User';

type Props = {
  user: User;
};

export const UserCard: React.FC<Props> = ({user}) => {
  const auth = useAuth();

  const isPeeping = auth.user?.peeps.some(id => id === user.id);

  const peepUser = () => {
    if (isPeeping) {
      auth.setPeeping('unpeep', user.id);
    } else {
      auth.setPeeping('peep', user.id);
    }
  };

  return (
    <View className="p-[10px] border border-grayDark rounded-[8px] gap-[8px]">
      <Image
        source={{
          uri: user.imageLink || '',
        }}
        className="w-[121px] h-[129px] rounded-[4px]"
      />

      <View className="flex-row justify-between">
        <View className="gap-[4px]">
          <Text className="font-robotoMedium color-white">{user.username}</Text>
          <Text className="font-robotoMedium color-grayLight">
            {user.username}
          </Text>
        </View>
      </View>

      <Pressable
        className="bg-white w-full py-[5px] items-center rounded-[4px]"
        onPress={peepUser}>
        <Text className="font-robotoMedium text-[16px] color-black">
          {isPeeping ? 'Peeping' : 'Peep'}
        </Text>
      </Pressable>
    </View>
  );
};
