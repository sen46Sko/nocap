import React, {useState} from 'react';
import {View} from 'react-native';

import {SelectItem} from 'components/molecules/SelectItem';

export const NotificaitonsMenu = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const selectItem = (item: string) => {
    if (item === 'all') {
      if (selected.length !== 3) {
        setSelected(['images', 'videos', 'hyperloops']);
      } else {
        setSelected([]);
      }

      return;
    }

    if (selected.some(selectedItem => selectedItem === item)) {
      setSelected(current =>
        current.filter(selectedItem => selectedItem !== item),
      );
    } else {
      setSelected(current => [...current, item]);
    }
  };

  return (
    <View className="gap-[24px]">
      <SelectItem
        label="Turn on notificaiton for all posts"
        isSelected={selected.length === 3}
        onSelect={() => selectItem('all')}
        type="check"
        style="green"
      />
      <SelectItem
        label="Images"
        isSelected={selected.some(item => item === 'images')}
        onSelect={() => selectItem('images')}
        type="check"
      />
      <SelectItem
        label="Videos"
        isSelected={selected.some(item => item === 'videos')}
        onSelect={() => selectItem('videos')}
        type="check"
      />
      <SelectItem
        label="Onspots"
        isSelected={selected.some(item => item === 'onspots')}
        onSelect={() => selectItem('onspots')}
        type="check"
      />
    </View>
  );
};
