import {ActivityIndicator, View} from 'react-native';
import React from 'react';

export const LoaderSpinner = () => {
  return (
    <View className="absolute left-0 right-0 bottom-0 top-0 z-10 justify-center items-center bg-black opacity-50">
      <ActivityIndicator size="large" />
    </View>
  );
};
