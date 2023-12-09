import { BackHandler, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { registerForPushNotificationsAsync } from '../notifications/expoNotification';
import { useUserLocationStore } from '../store/userLocation.store';
import userCurrentLocation from '../hooks/userCurrentLocation';
import * as Notifications from 'expo-notifications';
import AuthStackNavigator from '../navigations/AuthStackNavigator';
import DrawerNavigator from '../navigations/DrawerNavigator';
import DrawerStackNavigator from '../navigations/drawerStackNavigator';
import AppAlert from '../components/ui/AppAlert';


const AuthedReadyApp = () => {

    //userLocation
    const updateUserLocation = useUserLocationStore((state) => state.updateUserLocation)
    const { currentLocation } = userCurrentLocation()
    useEffect(() => {
        if (currentLocation) {
            console.log({ currentLocation });

            const location = { latitude: currentLocation?.latitude, longitude: currentLocation?.longitude }
            // updateUserProfile(location).catch(error => {
            //     console.log(error);
            // })
            updateUserLocation(location)
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