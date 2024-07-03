import {Image, Pressable} from 'react-native';
import classNames from 'classnames';
import React from 'react';
import {LoveEmojiUnchecked} from 'assets/images';

type Props = {
  isLiked: boolean;
  onPress: () => void;
};

export const LikeButton: React.FC<Props> = ({isLiked, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      className={classNames(
        'h-[32px] w-[32px] rounded-full items-center justify-center transition-colors bg-grayDark',
      )}>
      {isLiked ? (
        <Image
          source={require('@assets/images/LoveEmoji.png')}
          className="h-[18px] w-[18px]"
        />
      ) : (
        <LoveEmojiUnchecked width={20} height={20} />
      )}
    </Pressable>
  );
};
