import { Alert, StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { useUserLocationStore } from '../store/userLocation.store';
import userCurrentLocation from '../hooks/userCurrentLocation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import DrawerStackNavigator from '../navigations/drawerStackNavigator';
import { setStorageValues } from './AppAsyncStoreage';
import { AsyncStorageConstants, NotificationTopicConstants, isIos } from '../constants/CommonConsstats';
import useNotification from '../notification/useNotification';
import { updateUserProfile } from '../apis/users.api';


const AuthedReadyApp = () => {

    const { fcmToken, listenToBackgroundNotifications, subscribeTopic, listenToForegroundNotifications, onNotificationOpenedAppFromQuit, onNotificationOpenedAppFromBackground, checkApplicationNotificationPermission } = useNotification()
    console.log({ fcmToken });


    useEffect(() => {
        if (fcmToken) {
            console.log({ update: fcmToken });

            updateUserProfile({ fcmToken: fcmToken })
        }


        const listenToNotifications = () => {
            try {
                checkApplicationNotificationPermission()
                onNotificationOpenedAppFromQuit();
                listenToBackgroundNotifications();
                listenToForegroundNotifications();
                onNotificationOpenedAppFromBackground();
                subscribeTopic(NotificationTopicConstants.yamakAll)
            } catch (error) {
                console.log(error);
            }
        };
        listenToNotifications();
    }, [fcmToken]);


    //userLocation
    const updateUserLocation = useUserLocationStore((state) => state?.updateUserLocation)
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