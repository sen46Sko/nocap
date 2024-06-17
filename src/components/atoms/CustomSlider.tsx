// import {Slider} from '@miblanchard/react-native-slider';
import React from 'react';

type Props = {
  value: number;
  setValue: (value: number) => void;
};

export const CustomSlider: React.FC<Props> = ({value, setValue}) => {
  return (
    <Slider
      trackStyle={{height: 1}}
      thumbStyle={{backgroundColor: 'white'}}
      containerStyle={{height: 20}}
      value={value}
      onValueChange={res => setValue(res[0])}
      minimumValue={0}
      maximumValue={100}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#FFFFFF"
    />
  );
};
