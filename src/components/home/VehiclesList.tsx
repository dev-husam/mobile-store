import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch.hook'
import { IServices } from '../../constants/data'
import ServiceItem from './ServiceItem'
import { AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import VehicleItem from './VehicleItem'
import { useTranslation } from 'react-i18next'
import { AppSizes } from '../../constants/Sizes'
import userCurrentLocation from '../../hooks/userCurrentLocation'
import { useUserLocationStore } from '../../store/userLocation.store'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'
import NearByVehiclePH from '../placeHolders/NearByVehiclePH'
import useFetchV2 from '../../hooks/useFetchV2'
import { AppApiPath } from '../../apis/apisPath'


const renderItem = ({ item }: any) => (
    <VehicleItem item={item} />
);
const VehiclesList = () => {
    const { t } = useTranslation()
    const userLocation = useUserLocationStore((state) => state.userLocation)
    const [params, setParams] = useState({
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
    });

    useEffect(() => {
        setParams({
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
        });
    }, [userLocation?.latitude, userLocation?.longitude]);

    const { responseData: vehiclesList, loading } = useFetchV2({
        url: AppApiPath.vehiclesListApi, method: "get", params
    })
    // console.log(vehiclesList);


    if (loading) {
        return (
            <NearByVehiclePH />
        )

    }


    return (
        <View>
            <View style={styles.sectionContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <Text style={styles.labelText}>
                        {t("VehiclesNearBy")}
                    </Text>
                    <Pressable>
                        <Text style={styles.ViewLabelText}>
                            {t("ViewAll")}
                        </Text>
                    </Pressable>

                </View>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={vehiclesList?.list}
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