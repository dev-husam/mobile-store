import { StyleSheet, Text, View, Pressable, I18nManager } from "react-native";
import React from "react";

import { AppSizes } from "../../constants/Sizes";
import { AppFonts } from "../../constants/fonts";
import AppIcon from "../ui/appIcon";

interface props {
  type?: "Ionicons" | "AntDesign" | "MaterialIcons" | "Entypo" | "FontAwesome" | "Fontisto" | "MaterialCommunityIcons",
  iconName: string;
  iconColor?: string;
  text: string;
  size?: number,
  color?: string,
  onPress: () => void
}

const ProfileLables = ({
  iconName,
  iconColor = "black",
  text,
  size = 20,
  color = "white",
  type = "MaterialIcons",
  onPress,
}: props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        return [styles.labelContainer, pressed && styles.pressed];
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View
          style={{
            width: 40,
            backgroundColor: iconColor,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 20,
            marginRight: 20,
          }}
        >

          <AppIcon name={iconName} size={size} color={color} type={type} />
        </View>
        <Text style={{ fontSize: AppSizes.medium, fontFamily: AppFonts.Roboto_Med }}>{text}</Text>
      </View>
      <AppIcon
        type="FontAwesome5"
        name={I18nManager.isRTL ? "chevron-left" : "chevron-right"}
        size={20}
        color="black"
      />
    </Pressable>
  );
};

export default ProfileLables;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.6,
  },
  labelContainer: {
    width: "100%",
    minHeight: 80,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
});
