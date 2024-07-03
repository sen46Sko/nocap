import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {If} from './If';
import Video from 'react-native-video';
import {screenWidth} from 'utils/helpers';
import FastImage from 'react-native-fast-image';

type Props = {
  uri: string;
  width: number;
  type?: 'photo' | 'video' | 'onspot';
  onLoad?: () => void;
};

export const ImageAutoHeight: React.FC<Props> = ({
  uri,
  width,
  type = 'photo',
  onLoad = () => {},
}) => {
  const [aspectRatio, setAspectRatio] = useState(0);
  const isVideo = uri.endsWith('.mp4') || type === 'video';

  useEffect(() => {
    if (uri !== '' && !isVideo) {
      Image.getSize(uri, (imageWidth, imageHeight) =>
        setAspectRatio(imageWidth / imageHeight),
      );
    }
  }, [isVideo, uri]);
  return (
    <If condition={aspectRatio !== 0 || isVideo}>
      {isVideo ? (
        <Video
          source={{uri}}
          paused
          controls
          style={{width: screenWidth, height: (screenWidth / 3) * 4}}
        />
      ) : (
        <FastImage
          source={{uri}}
          style={{width, height: width / aspectRatio}}
          onLoad={onLoad}
        />
      )}
    </If>
  );
};
