import React, {useEffect, useState} from 'react';
import {Image, ImageProps} from 'react-native';

type Props = {
  uri: string;
  width: number;
  className?: string;
  props?: ImageProps;
};

export const ImageAutoHeight: React.FC<Props> = ({
  uri,
  className = '',
  width,
  props,
}) => {
  const [aspectRatio, setAspectRatio] = useState(0);
  console.log('🚀 ~ aspectRatio:', aspectRatio);
  useEffect(() => {
    Image.getSize(uri, (imageWidth, imageHeight) =>
      setAspectRatio(imageWidth / imageHeight),
    );
  }, [uri]);
  return (
    aspectRatio > 0 && (
      <Image
        {...props}
        source={{uri}}
        className={className}
        style={{width, height: width / aspectRatio}}
      />
    )
  );
};
