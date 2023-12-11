import { StyleSheet, Platform, SafeAreaView, ViewStyle, StatusBar } from "react-native";

import { ReactNode } from "react";


interface Props {
  children: ReactNode,
  style?: ViewStyle
}

const Screen = ({ children, style }: Props) => {
  return (
    <>
      <StatusBar
        animated={true}
        barStyle="light-content"
        backgroundColor="#6a51ae"
      />
      <SafeAreaView style={[styles.AndroidSafeArea, style]}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default Screen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
