import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import React from 'react';

export const LoaderSpinner = () => {
  return (
    <View style={styles.container}>
      <Spinner visible={true} textContent={''} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
