import React, {useEffect, useState} from 'react';
import {Image, ImageProps} from 'react-native';
import {If} from './If';
import Video from 'react-native-video';
import {screenWidth} from 'utils/helpers';

type Props = {
  uri: string;
  width: number;
  type?: 'photo' | 'video' | 'onspot';
  className?: string;
} & Partial<ImageProps>;

export const ImageAutoHeight: React.FC<Props> = ({
  uri,
  className = '',
  width,
  type = 'photo',
  ...props
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
        <Image
          {...props}
          source={{uri}}
          className={className}
          style={{width, height: width / aspectRatio}}
        />
      )}
    </If>
  );
};
