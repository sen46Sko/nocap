import React from 'react';
import {Image, Text, View} from 'react-native';
import {SmallButton} from './SmallButton';

type Props = {
  name: string;
  isPeep: boolean;
  photoUri: string;
};

export const ContactItem: React.FC<Props> = ({name, isPeep, photoUri}) => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-[16px]">
        {photoUri ? (
          <Image source={{uri: photoUri}} />
        ) : (
          <View className="w-[40px] h-[40px] rounded-full bg-grayLight" />
        )}
        <Text className="color-white font-robotoMedium text-[16px]">
          {name}
        </Text>
      </View>

      <SmallButton label={isPeep ? 'Peep' : 'Invite'} />
    </View>
  );
};
