import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import VehicleItem from './VehicleItem'
import { useTranslation } from 'react-i18next'
import { AppSizes } from '../../constants/Sizes'
import { useUserLocationStore } from '../../store/userLocation.store'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'
import useFetchV2 from '../../hooks/useFetchV2'
import { AppApiPath } from '../../apis/apisPath'
import { ActivityIndicator } from 'react-native'
import { useVehicleStore } from '../../store/vehicles.store'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../constants/ScreenNames'


const renderItem = ({ item }: any) => (
    <VehicleItem item={item} />
);
const VehiclesList = ({ horizontal = true }) => {
    const { t } = useTranslation()
    const navigation = useNavigation()
    const userLocation = useUserLocationStore((state) => state.userLocation)
    const setVehicles = useVehicleStore((state) => state.setVehicles)
    const vehicles = useVehicleStore((state) => state.vehicles)
    const [params, setParams] = useState({
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
    });
    const { responseData: vehiclesList, loading } = useFetchV2({
        url: AppApiPath.vehiclesListApi, method: "get", params
    })

    useEffect(() => {
        setParams({
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
        });
    }, [userLocation?.latitude, userLocation?.longitude]);

    useEffect(() => { setVehicles(vehiclesList?.list) }, [vehiclesList])

    if (loading) {
        return (
            // <NearByVehiclePH />
            <ActivityIndicator />
        )

    }


    return (
        <View>
            <View style={styles.sectionContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <Text style={styles.labelText}>
                        {t("VehiclesNearBy")}
                    </Text>
                    <Pressable
                        onPress={() => {
                            navigation.navigate(ScreenNames.ALL_VEHICLES_SCREEN)
                        }}
                    >
                        <Text style={styles.ViewLabelText}>
                            {t("ViewAll")}
                        </Text>
                    </Pressable>

                </View>

                <FlatList

                    showsHorizontalScrollIndicator={false}
                    horizontal={horizontal}
                    data={vehicles}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}

export default VehiclesList

const styles = StyleSheet.create({
    labelText: {
        fontSize: AppSizes.medium,
        fontFamily: AppFonts.Roboto_Med
    },
    ViewLabelText: {
        fontSize: AppSizes.small,
        color: AppColorsTheme2.secondary,
        fontFamily: AppFonts.Roboto_Med
    },
    sectionContainer: {
        borderRadius: 10,
        marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(20),
        // backgroundColor: "white"
    }
})