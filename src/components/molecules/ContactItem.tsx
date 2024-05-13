import {Image, Text, View} from 'react-native';
import React from 'react';

import {SmallButton} from 'components/atoms/buttons/SmallButton';

type Props = {
  name: string;
  buttonLabel: string;
  photoUri: string;
  onPress: () => void;
};

export const ContactItem: React.FC<Props> = ({
  name,
  buttonLabel,
  photoUri,
  onPress,
}) => {
  return (
    <View className="flex-row items-center justify-between gap-[8px] w-full">
      <View className="flex-row items-center gap-[16px]">
        {photoUri ? (
          <Image
            className="w-[40px] h-[40px] rounded-full"
            source={{uri: photoUri}}
          />
        ) : (
          <View className="w-[40px] h-[40px] rounded-full bg-grayLight" />
        )}

        <Text
          numberOfLines={1}
          className="color-white font-robotoMedium text-[16px] max-w-[200px]"
          w-full>
          {name}
        </Text>
      </View>

      <SmallButton label={buttonLabel} onPress={onPress} />
    </View>
  );
};
