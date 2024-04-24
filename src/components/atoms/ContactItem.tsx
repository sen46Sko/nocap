import {Image, Text, View} from 'react-native';
import React from 'react';

import {SmallButton} from 'components/atoms/SmallButton';

type Props = {
  name: string;
  isPeep: boolean;
  photoUri: string;
  onPress: () => void;
};

export const ContactItem: React.FC<Props> = ({
  name,
  isPeep,
  photoUri,
  onPress,
}) => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-[16px]">
        {photoUri ? (
          <Image
            className="w-[40px] h-[40px] rounded-full"
            source={{uri: photoUri}}
          />
        ) : (
          <View className="w-[40px] h-[40px] rounded-full bg-grayLight" />
        )}

        <Text className="color-white font-robotoMedium text-[16px]">
          {name}
        </Text>
      </View>

      <SmallButton label={isPeep ? 'Peep' : 'Invite'} onPress={onPress} />
    </View>
  );
};
