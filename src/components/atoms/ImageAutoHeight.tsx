import React, {useEffect, useState} from 'react';
import {Image, ImageProps} from 'react-native';
import {If} from './If';

type Props = {
  uri: string;
  width: number;
  className?: string;
} & Partial<ImageProps>;

export const ImageAutoHeight: React.FC<Props> = ({
  uri,
  className = '',
  width,
  ...props
}) => {
  const [aspectRatio, setAspectRatio] = useState(0);
  useEffect(() => {
    if (uri !== '') {
      Image.getSize(uri, (imageWidth, imageHeight) =>
        setAspectRatio(imageWidth / imageHeight),
      );
    }
  }, [uri]);
  return (
    <If condition={aspectRatio !== 0}>
      <Image
        {...props}
        source={{uri}}
        className={className}
        style={{width, height: width / aspectRatio}}
      />
    </If>
  );
};
