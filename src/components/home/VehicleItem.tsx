import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppFonts } from '../../constants/fonts'
import { AppColorsTheme2 } from '../../constants/Colors'
import AppIcon from '../ui/appIcon'
import { AppSizes } from '../../constants/Sizes'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../constants/ScreenNames'
import AppPressable from '../ui/AppPressable'
import FillledButton from '../ui/FillledButton'
import AppSeparator from '../ui/AppSeparator'
import { useTranslation } from 'react-i18next'

const VehicleItem = ({ item }: { item: any }) => {
    const navigator = useNavigation()
    const { t } = useTranslation()

    function vehiclesPressHandler() {
        navigator.navigate(ScreenNames.Vehicle_Details_Screen, { _id: item._id })
    }
    return (
        <Pressable onPress={vehiclesPressHandler} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <View style={styles.innerContainer} >
                <View style={{ flex: 1, padding: 4 }}>
                    <Image resizeMode='contain' source={require("../../assets/images/truck1.png")} style={{ width: "100%", height: "100%" }} />
                </View>
                <View style={{ borderWidth: 1, height: "75%", alignSelf: "center" }}>

                </View>

                <View style={{ flex: 2, padding: 10 }}>
                    <View style={{ flex: 2 }}>
                        <Text style={{ color: AppColorsTheme2.black, textAlign: "left", fontFamily: AppFonts.ROBOTO_Med_Itl, fontSize: AppSizes.medium, textTransform: "capitalize" }}>{item.branch.name}</Text>
                        <Text style={{ color: AppColorsTheme2.black, fontFamily: AppFonts.ROBOTO_Med_Itl, textAlign: "left", }}>services : {item.services.length}</Text>
                    </View>
                    <View style={{}}>
                        <AppSeparator />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <AppIcon name='location' />
                                <Text style={{ fontFamily: AppFonts.Roboto_Med }}>{item?.distance} {t("KM")}</Text>
                            </View>
                            <FillledButton onPress={vehiclesPressHandler} style={{ width: 60, height: 30 }}  >{t("View")}</FillledButton>

                        </View>
                    </View>


                </View>
            </View>
        </Pressable >
    )
}

export default VehicleItem

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
        overflow: "hidden",
        backgroundColor: AppColorsTheme2.white,
        // borderRadius: 20,
    },
    innerContainer: {
        overflow: "hidden",
        flexDirection: "row",
        resizeMode: "contain",
        height: 120,
        width: 300,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: AppColorsTheme2.primary,
        // borderWidth: 4,
        // backgroundColor: AppColorsTheme2.secondary

    },
    imageLabel: { fontFamily: AppFonts.ROBOTO_Med_Itl, marginVertical: 4 },
    pressed: {
        opacity: 0.7
    }
})