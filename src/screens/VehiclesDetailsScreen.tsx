import { FlatList, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/Screen';
import { AppColorsTheme2 } from '../constants/Colors';
import { getVehicleById } from '../apis/vehicles.api';
import { AppSizes } from '../constants/Sizes';
import { AppFonts } from '../constants/fonts';
import { ScrollView } from 'react-native-gesture-handler';

import AvailableServiceList from '../components/vehicleDetails/AvailableServiceList';
import GoBackButton from '../components/ui/GoBackButton';
import { showMessage } from 'react-native-flash-message';
import { getWhatsAppMessage } from '../constants/messages';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage.hook';

const VehiclesDetailsScreen = ({ route }) => {
    const { _id } = route?.params
    const [vehicle, setVehicle] = useState()
    const [pickedServices, setPickedServices] = useState([])
    const { currentLanguage } = useLanguage()
    const driverPhone = vehicle?.currentDriver?.phoneNum

    console.log({ loloooo: vehicle?.iconMap });


    useEffect(() => {
        if (_id) fetchVehicleData()
    }, [])

    async function fetchVehicleData() {
        try {
            const response = await getVehicleById(_id)
            setVehicle(response)
        } catch (error) {
            console.log(error)
        }
    }

    async function whatsappButtonPressHandler() {
        if (pickedServices.length == 0) {
            showMessage({ message: "services should be selected", type: "danger" })
            return
        }
        const servicesName = pickedServices.map(service => service.name[currentLanguage])
        const messageToSend = getWhatsAppMessage(currentLanguage, servicesName)
        console.log({ messageToSend });

        Linking.openURL(`whatsapp://send?text=${messageToSend}&phone=${driverPhone}`)
    }

    return (
        <Screen style={{ backgroundColor: AppColorsTheme2.offWhite }}>

            <ScrollView contentContainerStyle={{ flexGrow: 1, }} >
                <GoBackButton />

                <View style={{ borderBottomWidth: 1, justifyContent: "center", alignItems: "center", backgroundColor: AppColorsTheme2.white }}>
                    <Image style={{ height: 250, width: 250 }} resizeMode={"contain"} source={{ uri: vehicle?.iconMap }} />
                </View>
                <View style={{}}>

                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: AppSizes.medium, fontWeight: "bold", textAlign: "center", color: AppColorsTheme2.primary, justifyContent: "center", alignItems: "center", textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med }}>
                            {vehicle?.branch?.name} {vehicle?.company?.name[currentLanguage]}
                        </Text>
                    </View>
                    <View style={{ padding: 20, }}>
                        <Text style={{ fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, paddingHorizontal: 10, marginBottom: 10, textAlign: "left" }}>{t("Driver")}</Text>

                        <View style={{ marginBottom: 20, backgroundColor: AppColorsTheme2.white, borderRadius: 10, overflow: 'hidden' }}>
                            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginVertical: 10 }}>
                                <View style={{ borderWidth: 1, width: 80, height: 80, borderRadius: 40, justifyContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 40 }} source={{ uri: vehicle?.currentDriver?.photo ? vehicle?.currentDriver?.photo : "https://res.cloudinary.com/db9nm5unr/image/upload/v1694248776/pngwing.com_blkll6.png" }} />
                                </View>

                                <View>
                                    <Text style={{ fontFamily: AppFonts.Roboto_Med, textAlign: "left", fontSize: AppSizes.medium, marginLeft: 10 }}>
                                        {t("Name")} : {vehicle?.currentDriver?.name}
                                    </Text>
                                    <Text style={{ fontFamily: AppFonts.Roboto_Med, textAlign: "left", fontSize: AppSizes.medium, marginLeft: 10 }}>
                                        {t("Status")} : {vehicle?.workStatus}
                                    </Text>
                                    <Text style={{ fontFamily: AppFonts.Roboto_Med, textAlign: "left", fontSize: AppSizes.medium, marginLeft: 10 }}>
                                        {t("Phone")} : {vehicle?.currentDriver?.phoneNum}
                                    </Text>
                                </View>

                            </View>
                        </View>
                        <View style={{ borderRadius: 10, overflow: 'hidden' }} >
                            <Text style={{ fontFamily: AppFonts.Roboto_Med, textAlign: "left", fontSize: AppSizes.medium, paddingHorizontal: 5 }}>{t("AvailableServices")}</Text>
                            <View style={{ padding: 10, }}>
                                <AvailableServiceList services={vehicle?.services} pickedServices={pickedServices} setPickedServices={setPickedServices} />

                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ justifyContent: "space-around", alignItems: "center", height: 60, flexDirection: "row", }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: AppColorsTheme2.black, fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, }}>
                        {t("Services")}</Text>
                    <Text style={{ color: AppColorsTheme2.black, fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, }}>
                        {pickedServices.length}</Text>

                </View>
                <Pressable
                    onPress={whatsappButtonPressHandler}
                    style={({ pressed }) => [styles.whatsappButton, pressed && styles.pressed]}>
                    <Image style={{ width: 40, height: 40 }} source={require("../assets/images/whatsapp.png")} />
                    <Text style={{ color: "white", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.large }}>
                        {/* {vehicle?.currentDriver.phoneNum}
                         */}
                        {t("OrderNow")}
                    </Text>
                </Pressable>

            </View>

        </Screen >
    )
}

export default VehiclesDetailsScreen

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    },
    whatsappButton: {
        backgroundColor: "green", width: "60%", height: 40, borderRadius: 10,
        justifyContent: "center", alignItems: "center", flexDirection: "row"
    }
})