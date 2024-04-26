import {Text, View} from 'react-native';
import React from 'react';

export const SubmittedReport = () => {
  return (
    <View className="gap-[16px]">
      <Text className="font-robotoMedium text-[16px] color-white">
        Thanks for letting us know
      </Text>

      <Text className="font-robotoMedium color-grayLight">
        We use these reports to show you less of this kind of content in the
        future
      </Text>
    </View>
  );
};
