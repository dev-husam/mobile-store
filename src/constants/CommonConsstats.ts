import { Dimensions, Platform } from 'react-native';
import { getUniqueId, getManufacturer, getBuildNumber, getBuildId, getVersion } from 'react-native-device-info';
import Config from "react-native-config";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get('screen').height;
const isIos = Platform.OS === "ios"
const isDev = Config.NODE_ENV !== "production"
const AppEnv = Config.NODE_ENV

const AsyncStorageConstants = {
    env: "environment",
    isLunched: "isLunched",
    languageKey: "lang",
    userLocation: "userLocation"
}
const AppLimitList = 10

const appVersion = getVersion()
const appBuildNumber = getBuildNumber()

export {
    AsyncStorageConstants,
    deviceWidth,
    deviceHeight,
    isIos,
    appVersion,
    appBuildNumber,
    isDev,
    AppEnv,
    AppLimitList
}