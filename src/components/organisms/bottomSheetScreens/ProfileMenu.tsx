import {Alert, Share, View} from 'react-native';
import React from 'react';

import {BigButton} from 'components/atoms/buttons/BigButton';

type Props = {
  onReport: () => void;
};

export const ProfileMenu: React.FC<Props> = ({onReport}) => {
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
    <View className="gap-[16px]">
      <BigButton style="gray" label="Share profile" onPress={onShare} />
      <BigButton
        style="transparentRed"
        label="Report image"
        onPress={onReport}
      />
    </View>
  );
};
