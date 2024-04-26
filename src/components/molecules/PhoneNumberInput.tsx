import {StyleSheet} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import React from 'react';

type Props = {
  value: string;
  onChange: (number: string) => void;
};

export const PhoneNumberInput: React.FC<Props> = ({value, onChange}) => {
  return (
    <PhoneInput
      textInputStyle={styles.textInputStyle}
      containerStyle={styles.containerStyle}
      textContainerStyle={styles.textContainerStyle}
      codeTextStyle={styles.codeTextStyle}
      value={value}
      onChangeFormattedText={onChange}
      placeholder="Phone number"
      textInputProps={{
        placeholderTextColor: '#BEBABA',
        selectionColor: '#BEBABA',
      }}
      disableArrowIcon
      flagButtonStyle={styles.flagButtonStyle}
      defaultCode="US"
      countryPickerProps={{
        withFilter: false,
      }}
      withDarkTheme
    />
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    color: '#BEBABA',
    height: 40,
  },
  containerStyle: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#2A2929',
    borderRadius: 8,
    width: '100%',
    height: 40,
  },
  textContainerStyle: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingLeft: 0,
    height: 38,
  },
  codeTextStyle: {
    color: '#BEBABA',
    height: 20,
  },
  flagButtonStyle: {
    width: 60,
  },
});
