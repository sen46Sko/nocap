import {View} from 'react-native';
import React from 'react';

import {BigButton} from 'components/atoms/buttons/BigButton';

import {saveImageByUrl} from 'utils/helpers/post';

type Props = {
  imageUri: string;
  onReport: () => void;
  onShare: () => void;
};

export const FeedCardMenu: React.FC<Props> = ({
  onReport,
  onShare,
  imageUri,
}) => {
  return (
    <View className="gap-[16px]">
      <BigButton style="gray" label="Share profile" onPress={onShare} />
      <BigButton style="transparent" label="Share image" onPress={() => {}} />
      <BigButton
        style="transparent"
        label="Download image"
        onPress={() => saveImageByUrl(imageUri)}
      />
      <BigButton
        style="transparentRed"
        label="Report image"
        onPress={onReport}
      />
    </View>
  );
};
