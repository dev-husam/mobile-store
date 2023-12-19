import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import { AppColorsTheme2 } from '../../constants/Colors'
import { useLanguage } from '../../hooks/useLanguage.hook'

const AppText = ({ children, size = AppSizes.medium, color = AppColorsTheme2.black, textStyle, style }: { children: ReactNode, size?: number, textStyle?: TextStyle, style?: ViewStyle, color?: string }) => {
    const { isArabic } = useLanguage()

    return (
        <View style={[{ justifyContent: "center", alignItems: "center" }, style && style]}>
            <Text style={[{ fontFamily: AppFonts.Roboto_Med, fontSize: size, color }, isArabic && styles.arabicRight, textStyle && textStyle,]}>{children}</Text>
        </View>
    )
}

export default AppText

const styles = StyleSheet.create({
    arabicRight: {
        textAlign: "left"
    }
})