import { ActivityIndicator, FlatList, Image, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
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
import { useLanguage } from '../hooks/useLanguage.hook';
import VehiclesList from '../components/home/VehiclesList';
import AppText from '../components/ui/AppText';
import { sendOrderRequests } from '../apis/requests.api';
import { useAuthenticationStoreAsync } from '../store/auth.store';
import { useUserLocationStore } from '../store/userLocation.store';
import { wait } from '../helpers/AppHelpers';
import AppSimpleLoader from '../components/ui/AppSimpleLoader';
import AppPressable from '../components/ui/AppPressable';
import AppIcon from '../components/ui/appIcon';
import ShareWithus from '../components/vehicleDetails/ShareWithus';

const VehiclesDetailsScreen = ({ route }) => {
    const { _id } = route?.params
    const [vehicle, setVehicle] = useState()
    const [isWhatsLoading, setIsButtonWhatsLoading] = useState(false)
    const [isCallLoading, setIsCallLoading] = useState(false)
    const [pickedServices, setPickedServices] = useState([])
    const user = useAuthenticationStoreAsync((state) => state.user)
    const userLocation = useUserLocationStore((state) => state.userLocation)

    const { currentLanguage } = useLanguage()
    const driverPhone = vehicle?.currentDriver?.phoneNum
    const driver = vehicle?.currentDriver

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
        // if (pickedServices.length == 0) {
        //     showMessage({ message: "services should be selected", type: "danger" })
        //     return

        setIsButtonWhatsLoading(true)

        const dataToSend = {
            driverId: driver?._id,
            services: pickedServices,
            userId: user?._id,
            platform: "mobile",
            payload: {
                userLocation,
                mobileType: Platform.OS,
                button: "whatsapp"
            }
        }
        try {
            const response = await sendOrderRequests(dataToSend)

            const servicesName = pickedServices.map(service => service.name[currentLanguage])

            const messageToSend = getWhatsAppMessage(currentLanguage, servicesName)

            Linking.openURL(`whatsapp://send?text=${messageToSend}&phone=${driverPhone}`)
        } catch (error) {

        } finally {
            setIsButtonWhatsLoading(false)
        }

    }
    async function CallButtonPressHandler() {

        setIsCallLoading(true)

        const dataToSend = {
            driverId: driver?._id,
            services: pickedServices,
            userId: user?._id,
            platform: "mobile",
            payload: {
                userLocation,
                mobileType: Platform.OS,
                button: "call"
            }
        }
        try {
            const response = await sendOrderRequests(dataToSend)
            await wait(1222)
            Linking.openURL(`tel:${driverPhone}`)

            // Linking.openURL(`whatsapp://send?text=${messageToSend}&phone=${driverPhone}`)
        } catch (error) {

        } finally {
            setIsCallLoading(false)
        }

    }

    return (
        <Screen style={{ backgroundColor: AppColorsTheme2.offWhite }}>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, }} >
                <GoBackButton />

                <View style={{ borderBottomWidth: 0.3, justifyContent: "center", alignItems: "center", backgroundColor: AppColorsTheme2.white }}>
                    <Image style={{ height: 250, width: 250 }} resizeMode={"contain"} source={{ uri: vehicle?.iconMap }} />
                </View>
                <View style={{}}>

                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: AppSizes.medium, fontWeight: "600", textAlign: "center", color: AppColorsTheme2.primary, justifyContent: "center", alignItems: "center", textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med }}>
                            {vehicle?.company?.name[currentLanguage]}
                        </Text>
                        {/* <Text style={{ fontSize: AppSizes.medium, fontWeight: "500", textAlign: "center", color: AppColorsTheme2.primary, justifyContent: "center", alignItems: "center", textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med }}>
                            {vehicle?.branch?.name}
                        </Text> */}

                    </View>
                    <View style={{ padding: 20, }}>
                        <Text style={styles.heading}>{t("Driver")}</Text>

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
                                        {/* {t("Status")} : {vehicle?.workStatus} */}
                                        {t("Status")} : {t("Online")}

                                    </Text>
                                    <Text style={{ fontFamily: AppFonts.Roboto_Med, textAlign: "left", fontSize: AppSizes.medium, marginLeft: 10 }}>
                                        {t("Phone")} : {vehicle?.currentDriver?.phoneNum}
                                    </Text>
                                </View>

                            </View>
                        </View>
                        <View style={{ marginBottom: 20 }} >
                            <Text style={styles.heading}>{t("AvailableServices")}</Text>
                            <AvailableServiceList services={vehicle?.services} pickedServices={pickedServices} setPickedServices={setPickedServices} />
                        </View>

                        {/* share with us */}
                        {/* <View style={{ marginBottom: 20 }} >
                            <Text style={styles.heading}>{t("ShareWithUS")}</Text>
                            <View style={{ backgroundColor: AppColorsTheme2.white, borderRadius: 10, overflow: 'hidden' }}>
                                <View style={{ paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-around" }}>
                                    <AppPressable
                                        // onPress={iconPressHandler.bind(this, "https://twitter.com/yamak_kw")}
                                        style={styles.iconContainer}>
                                        <Image style={{ width: 20, height: 20 }} source={require("../assets/images/x.png")} />
                                    </AppPressable>

                                    <AppPressable
                                        // onPress={iconPressHandler.bind(this, "https://www.instagram.com/yamak.app/")}
                                        style={styles.iconContainer}>
                                        <Image style={{ width: 30, height: 30 }} source={require("../assets/icons/instagram.png")} />
                                    </AppPressable>
                                    <AppPressable
                                        // onPress={iconPressHandler.bind(this, "https://www.facebook.com/profile.php?id=61552273411460")}
                                        style={styles.iconContainer}>
                                        <Image style={{ width: 30, height: 30 }} source={require("../assets/icons/facebook.png")} />
                                    </AppPressable>
                                    <AppPressable
                                        // onPress={iconPressHandler.bind(this, "https://www.facebook.com/profile.php?id=61552273411460")}
                                        style={styles.iconContainer}>
                                        <AppIcon name='message1' type="AntDesign" size={30} />
                                    </AppPressable>
                                    <AppPressable
                                        // onPress={iconPressHandler.bind(this, "https://www.facebook.com/profile.php?id=61552273411460")}
                                        style={styles.iconContainer}>
                                        <AppIcon name='mail' size={30} />
                                    </AppPressable>
                                    <AppPressable
                                        // onPress={iconPressHandler.bind(this, "https://www.facebook.com/profile.php?id=61552273411460")}
                                        style={styles.iconContainer}>
                                        <AppIcon name='link' size={30} />
                                    </AppPressable>

                                </View>

                            </View>
                        </View> */}
                        <ShareWithus />
                        <View  >
                            <Text style={styles.heading}>{t("YourSaftyMatter")}</Text>
                            <View style={{ backgroundColor: AppColorsTheme2.white, borderRadius: 10, overflow: 'hidden' }}>
                                <View style={{ alignItems: "flex-start", paddingHorizontal: 20, marginVertical: 10 }}>
                                    <AppText textStyle={{ fontWeight: "500", color: "gray" }} style={{ marginBottom: 8 }}>
                                        {`\u2022 ${t("onlyMeetInPublic")}`}
                                    </AppText>
                                    <AppText textStyle={{ fontWeight: "500", color: "gray", flexWrap: "wrap" }} style={{ marginBottom: 8, }}>
                                        {`\u2022 ${t("CheckAndIncpect")}`}
                                    </AppText>
                                    <AppText textStyle={{ fontWeight: "500", color: "gray" }} style={{ marginBottom: 8 }}>
                                        {`\u2022 ${t("NeverPayAnythingInAdvance")}`}
                                    </AppText>
                                    <AppText textStyle={{ fontWeight: "500", color: "gray" }} style={{ marginBottom: 8 }}>
                                        {`\u2022 ${t("NeverGoAlone")}`}
                                    </AppText>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
                <VehiclesList selectedId={_id} />
            </ScrollView>
            <View style={{ justifyContent: "space-around", alignItems: "center", height: 60, flexDirection: "row", borderTopWidth: 0.3, borderColor: AppColorsTheme2.gray11, paddingHorizontal: "5%" }}>
                {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: AppColorsTheme2.black, fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, }}>
                        {t("Services")}</Text>
                    <Text style={{ color: AppColorsTheme2.black, fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, }}>
                        {pickedServices.length}</Text>

                </View> */}
                <Pressable
                    onPress={whatsappButtonPressHandler}
                    style={({ pressed }) => [styles.whatsappButton, pressed && styles.pressed]}>
                    {isWhatsLoading ? (
                        <AppSimpleLoader />
                    ) : (
                        <>
                            <Image style={{ width: 40, height: 40 }} source={require("../assets/images/whatsapp.png")} />
                            <Text style={{ color: "white", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.xMedium }}>

                                {t("OrderNow")}
                            </Text>
                        </>
                    )}

                </Pressable>
                <Pressable

                    onPress={CallButtonPressHandler}
                    style={({ pressed }) => [styles.whatsappButton, pressed && styles.pressed]}>
                    {isCallLoading ? (
                        <AppSimpleLoader />
                    ) : (<>
                        <AppIcon style={{ marginRight: 8 }} name='call' size={25} />
                        <Text style={{ color: "white", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.xMedium }}>
                            {t("Call")}
                        </Text>
                    </>)}

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
        minWidth: 160,
        paddingHorizontal: 10,
        backgroundColor: AppColorsTheme2.secondary
        , height: 40, borderRadius: 10,
        justifyContent: "center", alignItems: "center", flexDirection: "row"
    },

    heading: { fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, paddingHorizontal: 10, marginBottom: 10, textAlign: "left" },
    iconContainer: { width: 60, height: 60, justifyContent: "center", alignItems: "center", }

})