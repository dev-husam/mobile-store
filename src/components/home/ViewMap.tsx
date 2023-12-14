import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFetch } from '../../hooks/useFetch.hook'
import { Dimensions } from 'react-native';


import { AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import VehicleItem from './VehicleItem'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../constants/ScreenNames';
import { useTranslation } from 'react-i18next';


const renderItem = ({ item }: any) => (
    <VehicleItem item={item} />
);
const windowWidth = Dimensions.get("screen").width;
const ViewMap = () => {
    const navigation = useNavigation()
    const { t } = useTranslation()


    return (
        <Pressable onPress={() => {
            navigation.navigate(ScreenNames.Map_Screen)
        }}>
            <View style={styles.sectionContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <Text style={styles.labelText}>
                        {t("ViewOurMap")}
                    </Text>


                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}

                >
                    <Image
                        resizeMode='contain'
                        style={{ height: 200, }}
                        source={require("../../assets/images/map.jpg")}>
                    </Image>
                </View>
            </View>
        </Pressable>
    )
}

export default ViewMap

const styles = StyleSheet.create({
    labelText: { fontSize: 20, fontFamily: AppFonts.Roboto_Med },
    ViewLabelText: { fontSize: 15, color: AppColorsTheme2.secondary, fontFamily: AppFonts.Roboto_Med },
    sectionContainer: {
        padding: 6,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: "white"
    }
})