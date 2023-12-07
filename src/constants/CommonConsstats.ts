import { Dimensions, Platform } from 'react-native';
import { getUniqueId, getManufacturer, getBuildNumber, getBuildId, getVersion } from 'react-native-device-info';

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get('screen').height;
const isIos = Platform.OS === "ios"


const AsyncStorageConstants = {
    env: "environment",
    isLunched: "isLunched",
    languageKey: "lang"
}

const appVersion = getVersion()
const appBuildNumber = getBuildNumber()

export {
    AsyncStorageConstants,
    deviceWidth,
    deviceHeight,
    isIos,
    appVersion,
    appBuildNumber
}