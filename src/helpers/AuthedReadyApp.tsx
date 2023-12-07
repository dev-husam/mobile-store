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

    //notifications
    const [expoPushToken, setExpoPushToken] = useState('');
    const notificationListener = useRef();
    const responseListener = useRef();

    // useEffect(() => {

    //     registerForPushNotificationsAsync().then(token => {
    //         setExpoPushToken(token?.data)
    //     })

    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {

    //         console.log({ notification: JSON.stringify(notification) });

    //         // setNotification(notification);
    //     });

    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

    //     })

    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener.current);
    //         Notifications.removeNotificationSubscription(responseListener.current);
    //     }
    // }, [])


    //userLocation
    const updateUserLocation = useUserLocationStore((state) => state.updateUserLocation)
    const { currentLocation, isAppDenied } = userCurrentLocation()
    useEffect(() => {
        if (currentLocation) {
            const location = { latitude: currentLocation?.coords.latitude, longitude: currentLocation?.coords.longitude }
            // updateUserProfile(location).catch(error => {
            //     console.log(error);
            // })
            updateUserLocation(location)
        }
    }, [currentLocation]);




    return (
        <>
            <DrawerStackNavigator />
            <AppAlert
                title='location permissions required'
                message='permission should be granted in order to use the app'
                confirmMessage='open setting'
                onConfirm={() => {
                    Linking.openSettings()
                }}
                onCancel={() => BackHandler.exitApp()}
                visible={isAppDenied} />
        </>
    )
}

export default AuthedReadyApp

const styles = StyleSheet.create({})