import {Alert, Share, View} from 'react-native';
import React from 'react';

import {BigButton} from 'components/atoms/buttons/BigButton';

type Props = {};

export const MyPhotoMenu: React.FC<Props> = () => {
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

  return (
    <View className="gap-[24px]">
      <BigButton style="gray" label="Share photo" onPress={onShare} />

      <View>
        <BigButton
          style="transparent"
          label="Archive photo"
          onPress={() => {}}
        />

        <BigButton
          style="transparentRed"
          label="Delete photo"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
