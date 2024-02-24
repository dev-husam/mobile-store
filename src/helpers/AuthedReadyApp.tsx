import { Alert, Linking, StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { useUserLocationStore } from '../store/userLocation.store';
import userCurrentLocation from '../hooks/userCurrentLocation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import DrawerStackNavigator from '../navigations/drawerStackNavigator';
import { setStorageValues } from './AppAsyncStoreage';
import { AsyncStorageConstants, NotificationTopicConstants, isIos } from '../constants/CommonConsstats';
import useNotification from '../notification/useNotification';
import { updateUserProfile } from '../apis/users.api';
import { useNavigation } from '@react-navigation/native';


const AuthedReadyApp = () => {

    const { fcmToken, listenToBackgroundNotifications, subscribeTopic, listenToForegroundNotifications, onNotificationOpenedAppFromQuit, onNotificationOpenedAppFromBackground, checkApplicationNotificationPermission } = useNotification()
    const navigation = useNavigation()


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



    // useEffect(() => {
    //     const getInitalUrl = async () => {
    //         const initalUrl = await Linking.getInitialURL()
    //         console.log({ initalUrl });

    //         if (initalUrl === null) {
    //             return
    //         }
    //         if (initalUrl.includes("VehicleDetail")) {
    //             Alert.alert(initalUrl)
    //             navigation.navigate(ScreenNames.Vehicle_Details_Screen)
    //         }
    //     }
    //     getInitalUrl()

    // })

    return (
        <DrawerStackNavigator />
    )
}

export default AuthedReadyApp

const styles = StyleSheet.create({})