import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CarouselCards from '../ui/carousel-snap/CarouselCards'
import { useFetch } from '../../hooks/useFetch.hook'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'
import useFetchV2 from '../../hooks/useFetchV2'
import { AppApiPath } from '../../apis/apisPath'
import AddsListPh from '../placeHolders/AddsListPh'

const AddsList = () => {
    const { responseData: adds, loading } = useFetchV2({ method: "get", url: AppApiPath.addsListApi })



    if (loading) {
        return <AddsListPh />
    }

    return (
        <View style={styles.sectionContainer}>
            <CarouselCards data={adds?.list} />
        </View>
    )
}

export default AddsList

const styles = StyleSheet.create({
    sectionContainer: {
        padding: horizontalScale(8),
        borderRadius: 10,
        marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(20),

    }
})