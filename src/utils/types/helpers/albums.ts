import {getHighestIdFromArray} from 'utils/types/helpers';
import {Album} from 'utils/types/Album';

export const addAlbum = (albums: Album[], title: string) => {
  return [
    {
      id: getHighestIdFromArray(albums) + 1,
      name: title,
      images: [],
    },
    ...albums,
  ];
};

export const editAlbumName = (
  albums: Album[],
  albumId: number,
  newTitle: string,
) => {
  return albums.map(album =>
    album.id === albumId ? {...album, name: newTitle} : album,
  );
};

export const removeImage = (albums: Album[], imageId: string) => {
  return albums.map(album =>
    album.images.some(id => id === imageId)
      ? {...album, images: album.images.filter(id => id !== imageId)}
      : album,
  );
};

export const addImage = (albums: Album[], albumId: number, imageId: string) => {
  return albums.map(album =>
    album.id === albumId
      ? {...album, images: [...album.images, imageId]}
      : album,
  );
};
