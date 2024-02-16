import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { AppColorsTheme2 } from "../../../constants/Colors";
import { AppFonts } from "../../../constants/fonts";
import { AppSizes } from "../../../constants/Sizes";
import { StyleProp } from "react-native";

const FilledButton = ({
    disabled = false,
    children,
    onPress,
    style,
}: {
    disabled?: boolean
    style?: StyleProp<ViewStyle>
    children: string;
    onPress?: () => void;
}) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={({ pressed }) => [styles.container, pressed && styles.pressed, style && style]}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default FilledButton;

const styles = StyleSheet.create({
    container: {
        minWidth: "80%",
        minHeight: 40,
        backgroundColor: AppColorsTheme2.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    pressed: { opacity: 0.7 },
    text: {
        color: "white",
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.xMedium,
        fontWeight: "800",
        letterSpacing: 2,
        textTransform: "capitalize",
    },
});
