import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {User} from 'utils/types/User';

type Props = {
  user: User;
};

export const ProfileSearchItem: React.FC<Props> = ({user}) => {
  return (
    <View className=" bg-white flex-row gap-[5px]" style={{width: '100%'}}>
      <FastImage
        source={{uri: user.imageLink}}
        className="w-[48px] h-[48px] rounded-full"
      />
      <Text>{user.username}</Text>
    </View>
  );
};
