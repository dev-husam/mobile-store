import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFetch } from '../../hooks/useFetch.hook'
import { Dimensions } from 'react-native';
import MapPaper from "../../assets/images/Paper map-cuate.svg"


import { AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import VehicleItem from './VehicleItem'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../constants/ScreenNames';
import { useTranslation } from 'react-i18next';
import AppText from '../ui/AppText';
import { AppSizes } from '../../constants/Sizes';
import FillledButton from '../ui/FillledButton';
import AppIcon from '../ui/appIcon';



const renderItem = ({ item }: any) => (
    <VehicleItem item={item} />
);
const windowWidth = Dimensions.get("screen").width;
const ViewMap = () => {
    const navigation = useNavigation()
    const { t } = useTranslation()


    return (
        <View style={styles.sectionContainer}>

            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}

            >
                <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
                    {/* <AppText weight="700" alignItems="flex-start">View map </AppText> */}
                    <View style={{ flexDirection: "row", marginBottom: 4 }}>
                        <AppIcon style={{ marginHorizontal: 4 }} name='map-outline' />

                        <AppText weight='400' alignItems="flex-start">{t("ViewOurMap")}</AppText>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 4 }}>
                        <AppIcon style={{ marginHorizontal: 4 }} name='location-outline' />

                        <AppText weight='400' alignItems="flex-start">{t("PickAService")}</AppText>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 4 }}>
                        <AppIcon style={{ marginHorizontal: 4 }} name='time-outline' />

                        <AppText weight='400' alignItems="flex-start">{t("SaveYourTime")}</AppText>
                    </View>


                    <FillledButton
                        style={{ height: 32 }}
                        onPress={() => {
                            navigation.navigate(ScreenNames.Map_Screen)
                        }} ><Text>{t("BrowseMap")}</Text></FillledButton>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <MapPaper width={150} height={150} />
                    {/* <Image
                        resizeMode='contain'
                        style={{ height: 150, width: 150 }}
                        source={require("../../assets/images/kw-yamak.jpg")}>
                    </Image> */}

                </View>


                {/* <Image
                        resizeMode='contain'
                        style={{ height: 200, width: 300 }}
                        source={require("../../assets/images/kw-yamak.jpg")}>
                    </Image> */}
            </View>

        </View>
    )
}

export default ViewMap

const styles = StyleSheet.create({
    labelText: { fontSize: AppSizes.medium, fontFamily: AppFonts.Roboto_Med },
    ViewLabelText: { fontSize: 15, color: AppColorsTheme2.secondary, fontFamily: AppFonts.Roboto_Med },
    sectionContainer: {
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: "white",
        overflow: "hidden",
    }
})