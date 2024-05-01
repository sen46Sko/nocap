import {Pressable, View} from 'react-native';
import React, {useState} from 'react';

import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {CustomInput} from 'components/atoms/CustomInput';
import {SelectItem} from 'components/molecules/SelectItem';
import {If} from 'components/atoms/If';

import {Pencil, Plus} from 'assets/images';

type Props = {};

export const AlbumsMenu: React.FC<Props> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [album, setAlbum] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View className="gap-[24px]">
      <View className="flex-row gap-[14px] justify-between">
        <View className="flex-row gap-[16px]">
          <SmallButton
            label="Create album"
            onPress={() => setIsEditing(true)}
            Icon={Plus}
          />

          <Pressable
            className="bg-grayDark h-[27px] w-[27px] rounded-full items-center justify-center"
            onPress={() => setIsEditing(true)}>
            <Pencil />
          </Pressable>
        </View>
        <SmallButton label="Save" onPress={() => setIsEditing(false)} />
      </View>

      <View className="gap-[24px]">
        <If condition={isEditing}>
          <CustomInput
            value={album}
            setValue={setAlbum}
            placeholder="New Album name"
          />
        </If>

        <SelectItem
          label="Landscape"
          type="radio"
          isSelected={selected === 'landscape'}
          onSelect={() => setSelected('landscape')}
        />

        <SelectItem
          label="Portraits"
          type="radio"
          isSelected={selected === 'portraits'}
          onSelect={() => setSelected('portraits')}
        />

        <SelectItem
          label="Street photos"
          type="radio"
          isSelected={selected === 'streetPhotos'}
          onSelect={() => setSelected('streetPhotos')}
        />
      </View>
    </View>
  );
};
