import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';

import {SmallButton} from 'components/atoms/buttons/SmallButton';
import {CustomInput} from 'components/atoms/CustomInput';
import {SelectItem} from 'components/molecules/SelectItem';
import {If} from 'components/atoms/If';

import {useAuth} from 'contexts/AuthContext';

import {
  editAlbumName,
  removeImage,
  addAlbum,
  addImage,
} from 'utils/helpers/albums';
import {Album} from 'utils/types/Album';

import {Pencil, Plus} from 'assets/images';

type Props = {
  imageId: string;
  close: () => void;
};

export const AlbumsMenu: React.FC<Props> = ({imageId, close}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingAlbumId, setEditingAlbomId] = useState<number | null>(null);
  const [editingAlbumTitle, setEditingAlbumTitle] = useState('');
  const [selected, setSelected] = useState<Album | null>(null);

  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) {
      return;
    }

    const foundAlbum = auth.user.albums.find(album =>
      album.images.some(id => id === imageId),
    );

    setSelected(foundAlbum || null);
  }, [auth.user, imageId]);

  const createAlbum = () => {
    setIsCreating(true);
    setEditingAlbomId(null);
    setEditingAlbumTitle('');
  };

  const editAlbum = () => {
    if (selected) {
      setEditingAlbomId(selected.id);
      setEditingAlbumTitle(selected.name);
      setIsCreating(false);
    }
  };

  const selectAlbum = (album: Album) => {
    setEditingAlbomId(null);
    setEditingAlbumTitle('');
    setIsCreating(false);
    setSelected(album);
  };

  const handleSave = () => {
    if (!auth.user) {
      return;
    }

    if (isCreating) {
      const updatedAlbums = addAlbum(auth.user.albums, editingAlbumTitle);

      auth.updateUser({albums: updatedAlbums});

      setEditingAlbumTitle('');
      setIsCreating(false);
    } else if (editingAlbumId !== null) {
      const updatedAlbums = editAlbumName(
        auth.user.albums,
        editingAlbumId,
        editingAlbumTitle,
      );

      auth.updateUser({albums: updatedAlbums});

      setEditingAlbomId(null);
      setEditingAlbumTitle('');
    } else if (selected) {
      if (!selected.images.some(id => id === imageId)) {
        const albumsWithoutImage = removeImage(auth.user.albums, imageId);
        const updatedAlbums = addImage(
          albumsWithoutImage,
          selected.id,
          imageId,
        );

        auth.updateUser({albums: updatedAlbums});
      }

      close();
    }
  };

  return (
    <View className="gap-[24px]">
      <View className="flex-row gap-[14px] justify-between">
        <View className="flex-row gap-[16px]">
          <SmallButton label="Create album" onPress={createAlbum} Icon={Plus} />

          <Pressable
            className="bg-grayDark h-[27px] w-[27px] rounded-full items-center justify-center"
            onPress={editAlbum}>
            <Pencil />
          </Pressable>
        </View>
        <SmallButton label="Save" onPress={handleSave} />
      </View>

      <View className="gap-[24px]">
        <If condition={isCreating}>
          <CustomInput
            value={editingAlbumTitle}
            setValue={setEditingAlbumTitle}
            placeholder="New Album name"
          />
        </If>

        {auth.user?.albums.map(album =>
          editingAlbumId === album.id ? (
            <CustomInput
              key={album.id}
              value={editingAlbumTitle}
              setValue={setEditingAlbumTitle}
              placeholder="Set album title"
            />
          ) : (
            <SelectItem
              key={album.id}
              label={album.name}
              type="radio"
              isSelected={selected?.id === album.id}
              onSelect={() => selectAlbum(album)}
            />
          ),
        )}
      </View>
    </View>
  );
};
