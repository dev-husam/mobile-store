import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import Screen from '../components/Screen'
import AppText from '../components/ui/AppText'
import PressbleAppIcon from '../components/ui/pressbleAppIcon'
import AppSearch from '../components/home/Search'
import { AppColorsTheme2 } from '../constants/Colors'
import { AppSizes } from '../constants/Sizes'
import { deviceWidth } from '../constants/CommonConsstats'
import { FlatList } from 'react-native-gesture-handler'
import { horizontalScale, verticalScale } from '../helpers/Scalling'
import BottomSheet from '../components/ui/BottomSheet'
import { useTranslation } from 'react-i18next'
import CarItem from '../components/Profile/myCarList/CarItem'
import AddNewCarContet from '../components/Profile/myCarList/AddNewCarContent'
import AddNewCarContent from '../components/Profile/myCarList/AddNewCarContent'
import useFetchV2 from '../hooks/useFetchV2'
import { AppApiPath } from '../apis/apisPath'
import { addUserCars, deleteUserCars, getUserCars } from '../apis/userCars.api'
// import MyCarListPh from '../components/placeHolders/MyCarListPh'
import LoadingLoatie from '../components/ui/LoadingLootie'
import UserCarsList from '../components/Profile/myCarList/CarList'
import { ActivityIndicator } from 'react-native'
// import ItemsListPh from '../components/placeHolders/ItemsListPh'


const MyCarScreen = ({ navigation }) => {

    const [refreshing, setRefreshing] = useState(false)
    const [isCallingApi, setIsCallingApi] = useState(false)
    const [carList, setCarList] = useState([])
    const [filteredData, setFilteredData] = useState(carList);
    const { responseData: data, loading } = useFetchV2({ method: "get", url: AppApiPath.userCarsListApi })

    const bottomSheetRef = useRef()
    const { t } = useTranslation()

    useEffect(() => {
        setCarList(data?.list)
    }, [data])


    async function handleSearch(text) {
        if (carList.length == 0) return
        const filteredItems = carList.filter((item) =>
            item?.model?.toLowerCase().includes(text.toLowerCase()) || item?.make?.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filteredItems);

    }


    async function addNewCarHandler(car) {
        const response = await addUserCars(car)
        const carlistResponse = await getUserCars()
        setCarList(carlistResponse?.list)
        setRefreshing(false)
        bottomSheetRef.current.close()
    }

    async function deleteCarHandler(id: string) {
        const response = await deleteUserCars(id)
        const carlistResponse = await getUserCars()
        setCarList(carlistResponse?.list)
    }
    function OpenBottomSheetHandler() {
        bottomSheetRef.current.present()
    }
    const refreshHandler = useCallback(async () => {
        try {
            const carlistResponse = await getUserCars()
            setCarList(carlistResponse?.list)
            setRefreshing(false)

        } catch (error) {
            console.log(error);
        }
    },
        []
    )
    return (
        <Screen>
            {isCallingApi && <LoadingLoatie />}
            <View style={{ paddingHorizontal: 24, flex: 1, backgroundColor: AppColorsTheme2.offWhite }}>
                <View style={{ position: "absolute", right: deviceWidth * 0.07, top: 10 }}>
                    <PressbleAppIcon name="add" size={30} onPress={OpenBottomSheetHandler}></PressbleAppIcon>
                </View>
                <View style={{ marginTop: 30 }}>
                    <AppText size={AppSizes.large} textStyle={{ textAlign: "center", textTransform: "capitalize" }}>{t("MyCarList")}</AppText>
                </View>

                <View style={{ marginTop: 20 }}>
                    <AppSearch onSearch={handleSearch} label={t("Search")} />
                </View>

                {loading ? (<ActivityIndicator />) : (
                    <UserCarsList OnEmptyPress={OpenBottomSheetHandler} deleteCarHandler={deleteCarHandler} data={carList} filteredItem={filteredData} refreshHandler={refreshHandler} refreshing={refreshing} />
                )}
            </View>
            <BottomSheet ref={bottomSheetRef} snapPoint={"80%"} >
                <AddNewCarContent onAddCar={addNewCarHandler} />
            </BottomSheet>
        </Screen >
    )
}

export default MyCarScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: verticalScale(10),
        alignSelf: "center",
        // padding: 16,
    },

    trashDetails: {
        flex: 0.2,
        padding: 12,
    },
    carMake: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    carModel: {
        fontSize: 16,
        color: '#666',
    },
    carYear: {
        fontSize: 14,
        color: '#999',
    },
})