import { useEffect, useState } from "react"
import * as Location from 'expo-location';
import { Alert, BackHandler, Linking } from "react-native";


const userCurrentLocation = () => {
    const [currentLocation, setCurrentLocation] = useState<any>(null)
    const [error, setError] = useState("")
    const [isAppDenied, setIsAppDenied] = useState(false)
    // console.log(isAppDenied);

    // useEffect(() => {
    //     if (isAppDenied) {
    //         BackHandler.exitApp()
    //     }
    // }, [isAppDenied])

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                // Alert.alert("location permission", "permissions is required", [
                //     {
                //         text: "cancel",
                //         style: "destructive",
                //         onPress: () => setIsAppDenied(true)

                //     },
                //     {
                //         text: "open setting",
                //         onPress: () => {
                //             Linking.openSettings()
                //         }
                //     }])
                return
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location);
            setIsAppDenied(false)
        })();
    }, []);
    return { currentLocation, error, isAppDenied }
}

export default userCurrentLocation

