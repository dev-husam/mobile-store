import { StyleSheet, Platform, SafeAreaView, ViewStyle } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";


interface Props {
  children: ReactNode,
  style?: ViewStyle
}

const Screen = ({ children, style }: Props) => {
  return (
    <>
      <StatusBar style="light" />
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
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});
