import {Text, View} from 'react-native';
import React from 'react';

import {BigButton} from 'components/atoms/buttons/BigButton';

type Props = {
  close: () => void;
  logout: () => void;
};

export const Logout: React.FC<Props> = ({close, logout}) => {
  return (
    <View className="gap-[24px]">
      <Text className="font-robotoMedium text-[16px] color-white">
        Do you want to logout?
      </Text>

      <View className="gap-[16px]">
        <BigButton style="gray" label="No, go back" onPress={close} />
        <BigButton
          style="transparentRed"
          label="Yes, logout"
          onPress={logout}
        />
      </View>
    </View>
  );
};
