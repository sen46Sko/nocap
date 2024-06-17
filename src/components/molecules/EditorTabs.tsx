import classNames from 'classnames';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {EditorTabsEnum} from 'utils/types/EditorTabsEnum';

type Props = {
  activeTab: EditorTabsEnum;
  setActiveTab: (tab: EditorTabsEnum) => void;
};

export const EditorTabs: React.FC<Props> = ({activeTab, setActiveTab}) => {
  return (
    <View className="w-full flex-row justify-between">
      <Pressable onPress={() => setActiveTab(EditorTabsEnum.WHITE_BALANCE)}>
        <Text
          className={classNames('font-robotoRegular text-[16px]', {
            'color-white': activeTab === EditorTabsEnum.WHITE_BALANCE,
            'color-grayMedium': activeTab !== EditorTabsEnum.WHITE_BALANCE,
          })}>
          White Ballance
        </Text>
      </Pressable>

      <Pressable onPress={() => setActiveTab(EditorTabsEnum.EXPOSURE)}>
        <Text
          className={classNames('font-robotoRegular text-[16px]', {
            'color-white': activeTab === EditorTabsEnum.EXPOSURE,
            'color-grayMedium': activeTab !== EditorTabsEnum.EXPOSURE,
          })}>
          Exposure
        </Text>
      </Pressable>

      <Pressable onPress={() => setActiveTab(EditorTabsEnum.SATURATION)}>
        <Text
          className={classNames('font-robotoRegular text-[16px]', {
            'color-white': activeTab === EditorTabsEnum.SATURATION,
            'color-grayMedium': activeTab !== EditorTabsEnum.SATURATION,
          })}>
          Saturation
        </Text>
      </Pressable>

      <Pressable onPress={() => setActiveTab(EditorTabsEnum.ADJUST)}>
        <Text
          className={classNames('font-robotoRegular text-[16px]', {
            'color-white': activeTab === EditorTabsEnum.ADJUST,
            'color-grayMedium': activeTab !== EditorTabsEnum.ADJUST,
          })}>
          Adjust
        </Text>
      </Pressable>
    </View>
  );
};
