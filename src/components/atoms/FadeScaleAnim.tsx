import React, {ReactNode, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

type Props = {
  isStarted?: boolean;
  children: ReactNode;
};

export const FadeScaleAnim: React.FC<Props> = ({
  children,
  isStarted = true,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (isStarted) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, isStarted, scaleAnim]);

  return (
    <Animated.View style={{transform: [{scale: scaleAnim}], opacity: fadeAnim}}>
      {children}
    </Animated.View>
  );
};
