import { FlatList, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import { AppFonts } from '../constants/fonts'
import { AppSizes } from '../constants/Sizes'
import { AppColorsTheme2 } from '../constants/Colors'
import AppIcon from '../components/ui/appIcon'
import AppPressable from '../components/ui/AppPressable'
import GoBackButton from '../components/ui/GoBackButton'
import AppSeparator from '../components/ui/AppSeparator'
import { useTranslation } from 'react-i18next'

const ContactUsScreen = () => {
    const { t, i18n } = useTranslation()
    const currentLang = i18n.language

    function iconPressHandler(url: string) {
        Linking.openURL(url)
    }

    return (
        <Screen>
            {/* <ScrollView style={{ flex: 1, backgroundColor: AppColorsTheme2.offWhite }}> */}
            <View style={{ flex: 1, backgroundColor: AppColorsTheme2.offWhite, }}>


                <View style={{ padding: 24, flex: 1 }}>
                    <View style={{}}>
                        <GoBackButton />
                        <View style={{ justifyContent: "center", alignItems: "center", }}>
                            <Text style={{ fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, paddingTop: 10 }}>
                                {t("ContactUs")}
                            </Text>
                            {/* <Text style={{ fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.small, color: AppColorsTheme2.gray }}>
                                List Of Branches
                            </Text> */}
                        </View>
                        {/* <Image resizeMode="contain" style={{ height: 80, width: 120 }} source={require("../assets/images/contactus.png")} /> */}

                    </View>
                    {/* <AppSeparator /> */}

                    <View style={{ flex: 1, marginTop: 40 }}>
                        <FlatList data={customerServicesList} renderItem={({ item }) => <ContactUsItem item={item} />} />

                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, textAlign: "center" }}>
                        {t("FollowUs")}
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                        <AppPressable
                            onPress={iconPressHandler.bind(this, "https://www.instagram.com/yamak.app/")}
                            style={styles.iconContainer}>
                            <Image style={{ width: 50, height: 50 }} source={require("../assets/icons/twitter.png")} />
                        </AppPressable>
                        <AppPressable
                            onPress={iconPressHandler.bind(this, "https://www.instagram.com/yamak.app/")}
                            style={styles.iconContainer}>
                            <Image style={{ width: 50, height: 50 }} source={require("../assets/icons/linkedin.png")} />
                        </AppPressable>
                        <AppPressable
                            onPress={iconPressHandler.bind(this, "https://www.instagram.com/yamak.app/")}
                            style={styles.iconContainer}>
                            <Image style={{ width: 40, height: 40 }} source={require("../assets/icons/instagram.png")} />
                        </AppPressable>
                        <AppPressable onPress={iconPressHandler.bind(this, "https://www.facebook.com/profile.php?id=61552273411460")} style={styles.iconContainer}>
                            <Image style={{ width: 40, height: 40 }} source={require("../assets/icons/facebook.png")} />
                        </AppPressable>
                    </View>

                </View>
            </View>
            {/* </ScrollView> */}
        </Screen>
    )
}


const ContactUsItem = ({ item }: { item: { phone: string, name: string } }) => {


    const { t, i18n } = useTranslation()
    const currentLang = i18n.language

    async function contactPressHandler(phone: string) {
        Linking.openURL(`tel:${phone.trim()}`)
    }

    return (<Pressable
        onPress={() => contactPressHandler(item.phone)}
        style={{ marginBottom: 10, flexDirection: "row", borderTopWidth: 0.5, paddingVertical: 10 }}>
        <View style={{ borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
            <Image source={require("../assets/images/appLogo.png")} resizeMode="center" style={{ width: 80, height: 80 }} />
        </View>
        <View style={{ justifyContent: "center", flex: 1, padding: 10, }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: AppFonts.Roboto_Med, marginLeft: 10, fontSize: AppSizes.medium, marginVertical: 8, textTransform: "uppercase" }}>
                    {item.name[currentLang]}
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AppIcon name='phone' type="FontAwesome" size={20} />
                <Text style={{ fontFamily: AppFonts.Roboto_Med, marginVertical: 2, marginLeft: 10 }}>
                    {item.phone}
                </Text>
            </View>

        </View>

    </Pressable >)
}



export default ContactUsScreen


const customerServicesList = [
    {
        name: {
            en: "customer service - salmiya",
            ar: "خدمة الزبائن - السالميه"
        },
        phone: "+96550535103"
    },
    {
        name: {
            en: "customer service - hawally",
            ar: "خدمة الزبائن - حولي"
        },
        phone: "+96550535103"
    },
    {
        name: {
            en: "customer service - farwaniya",
            ar: "خدمة الزبائن - فروانيه"
        },
        phone: "+96566917953"
    },
    {
        name: {
            en: "customer service - sabah salem",
            ar: "خدمة الزبائن - صباح سالم"
        },
        phone: "+96566917953"
    },

]




const styles = StyleSheet.create({
    iconContainer: { width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", marginRight: 8 }
})