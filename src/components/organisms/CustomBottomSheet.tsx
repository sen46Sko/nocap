import React, {ReactNode, useCallback} from 'react';
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {StyleSheet, View} from 'react-native';

import {Handle} from 'assets/images';

type Props = {
  children: ReactNode;
  snapPoints: string[];
  onClose: () => void;
};

export const CustomBottomSheet: React.FC<Props> = ({
  children,
  snapPoints,
  onClose,
}) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={0.7}
        enableTouchThrough={true}
      />
    ),
    [],
  );

  const renderHandle = useCallback(
    () => (
      <View className="w-full items-center py-[14px]">
        <Handle />
      </View>
    ),
    [],
  );

  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={snapPoints.length - 1}
      handleStyle={styles.handleStyle}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={styles.bg}
      handleComponent={renderHandle}
      backdropComponent={renderBackdrop}>
      <BottomSheetView style={styles.bottomSheetContentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  handleStyle: {
    paddingVertical: 16,
  },
  bg: {
    backgroundColor: 'black',
  },
});
