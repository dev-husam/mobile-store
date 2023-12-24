

import { StyleSheet, Text, View } from 'react-native'
import messaging from '@react-native-firebase/messaging';

import React, { useEffect, useState } from 'react'

const useNotification = () => {
    const [granted, setGranted] = useState(false)

    useEffect(() => {
        requestUserPermission()
        if (granted) {

            checkToken()
        }


    }, [])

    useEffect(() => {
        messaging().setBackgroundMessageHandler(async remote => {
            console.log({ remote });
        })
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("message recived ===>", remoteMessage);

        })


    }, [])

    async function checkToken() {
        const fcmToken = await messaging().getToken()
        console.log({ fcmToken });
        if (fcmToken) {
            console.log("got token ====>", fcmToken);
        }


    }

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
            setGranted(true)
        }
    }
    return {
        granted
    }
}

export default useNotification

const styles = StyleSheet.create({})