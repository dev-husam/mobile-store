import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import React, {forwardRef} from 'react';

interface props {
  children?: React.ReactNode;
  style?: ViewStyle;

  onPress?: () => void;
}
const AppPressable = forwardRef(({children, style, onPress}: props, ref) => {
  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      style={({pressed}) => [style, pressed && styles.pressed]}>
      {children}
    </Pressable>
  );
});

export default AppPressable;

const styles = StyleSheet.create({
  pressed: {opacity: 0.7},
});
