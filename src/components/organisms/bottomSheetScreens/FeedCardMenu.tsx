import {View} from 'react-native';
import React from 'react';

import {BigButton} from 'components/atoms/buttons/BigButton';

type Props = {
  onReport: () => void;
};

export const FeedCardMenu: React.FC<Props> = ({onReport}) => {
  return (
    <View className="gap-[16px]">
      <BigButton style="gray" label="Share profile" onPress={() => {}} />
      <BigButton style="transparent" label="Share image" onPress={() => {}} />
      <BigButton
        style="transparent"
        label="Download image"
        onPress={() => {}}
      />
      <BigButton
        style="transparentRed"
        label="Report image"
        onPress={onReport}
      />
    </View>
  );
};
