import { NavigationContainer } from "@react-navigation/native";
import { startTransition, useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import AuthedReadyApp from "./src/helpers/AuthedReadyApp";
import AuthStackNavigator from "./src/navigations/AuthStackNavigator";
import { useAppReadyStore } from "./src/store/appReady.store";
import { useAuthenticationStoreAsync } from "./src/store/auth.store";
import { getStorageValues, setStorageValues } from "./src/helpers/AppAsyncStoreage";
import { AsyncStorageConstants } from "./src/constants/CommonConsstats";
import { getAppSetting } from "./src/apis/common.api";
import { useLanguage } from "./src/hooks/useLanguage.hook";
import { useAppReady } from "./src/hooks/useAppReady";
import { addEventListener, useNetInfoInstance } from "@react-native-community/netinfo";


export function RootFun() {
    const { netInfo: { type, isConnected }, refresh } = useNetInfoInstance();
    const setIsFirstLunch = useAppReadyStore((state) => state.setIsFirstLunch)
    const setAppSetting = useAppReadyStore((state) => state.setAppSetting)
    const token = useAuthenticationStoreAsync((state) => state.token)
    const { appIsReady } = useAppReady()

    // throw new Error('My first Sentry error!');

    useEffect(() => {
        getStorageItem();
        callAppApis();
    }, [])

    //check first lunch app view onboarding
    const getStorageItem = async () => {
        try {
            const key = await getStorageValues(AsyncStorageConstants.isLunched);
            if (!key) {
                setIsFirstLunch(true);
                await setStorageValues(AsyncStorageConstants.isLunched, "true");
            }
        } catch (error) {
            console.error("Error in getStorageItem:", error);
        }
    };

    async function callAppApis() {
        const response = await getAppSetting()
        setAppSetting(response)
    }

    // if (!isConnected) {
    //     return <NoNetworkScreen />
    // }
    if (!appIsReady) {
        return null;
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider >
                <Navigation token={token} />
            </BottomSheetModalProvider>
        </GestureHandlerRootView >

    );
}



export function Navigation() {
    const token = useAuthenticationStoreAsync((state) => state.token)
    return (
        <NavigationContainer>
            {token ? <AuthedReadyApp /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
}



//notifications



