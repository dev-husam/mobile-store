import { StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { useUserLocationStore } from '../store/userLocation.store';
import userCurrentLocation from '../hooks/userCurrentLocation';

import DrawerStackNavigator from '../navigations/drawerStackNavigator';
import AppAlert from '../components/ui/AppAlert';
import { setStorageValues } from './AppAsyncStoreage';
import { AsyncStorageConstants } from '../constants/CommonConsstats';


const AuthedReadyApp = () => {

    //userLocation
    const updateUserLocation = useUserLocationStore((state) => state.updateUserLocation)
    const { currentLocation } = userCurrentLocation()
    useEffect(() => {
        if (currentLocation) {
            const location = { latitude: currentLocation?.latitude, longitude: currentLocation?.longitude }
            updateUserLocation(location)
            setStorageValues(AsyncStorageConstants.userLocation, JSON.stringify(location))
        }
    }, [currentLocation]);




    return (
        <>
            <DrawerStackNavigator />
            {/* <AppAlert
                title='location permissions required'
                message='permission should be granted in order to use the app'
                confirmMessage='open setting'
                onConfirm={() => {
                    Linking.openSettings()
                }}
                onCancel={() => BackHandler.exitApp()}
                visible={isAppDenied} /> */}
        </>
    )
}

export default AuthedReadyApp

const styles = StyleSheet.create({})