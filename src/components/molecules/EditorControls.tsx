import React from 'react';
import {View} from 'react-native';

import {CustomSlider} from 'components/atoms/CustomSlider';

import {EditorTabsEnum} from 'utils/types/EditorTabsEnum';
import {EditorFields} from 'utils/types/EditorFields';
import {If} from 'components/atoms/If';

type Props = {
  activeTab: EditorTabsEnum;
  imageSettings: EditorFields;
  setImageSettings: React.Dispatch<React.SetStateAction<EditorFields>>;
};

export const EditorControls: React.FC<Props> = ({
  activeTab,
  imageSettings,
  setImageSettings,
}) => {
  const getCurrentValue = () => {
    switch (activeTab) {
      default:
      case EditorTabsEnum.EXPOSURE:
        return imageSettings.exposure;
      case EditorTabsEnum.SATURATION:
        return imageSettings.saturation;
      case EditorTabsEnum.WHITE_BALANCE:
        return imageSettings.hue;
    }
  };

  const setValue = (value: number) => {
    switch (activeTab) {
      default:
      case EditorTabsEnum.EXPOSURE:
        setImageSettings(current => ({...current, exposure: value}));
        break;
      case EditorTabsEnum.SATURATION:
        setImageSettings(current => ({...current, saturation: value}));
        break;
      case EditorTabsEnum.WHITE_BALANCE:
        setImageSettings(current => ({...current, hue: value}));
        break;
    }
  };

  return (
    <View className="w-full h-[104px] justify-around">
      {/* <If condition={activeTab !== EditorTabsEnum.ADJUST}>
        <CustomSlider
          value={getCurrentValue() + 50}
          setValue={num => setValue(num - 50)}
        />
      </If> */}
    </View>
  );
};
