import { Dimensions, Platform } from 'react-native';
import { getUniqueId, getManufacturer, getBuildNumber, getBuildId, getVersion } from 'react-native-device-info';

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get('screen').height;
const isIos = Platform.OS === "ios"
import Constants from 'expo-constants';


const AsyncStorageConstants = {
    env: "environment",
    isLunched: "isLunched",
    languageKey: "lang"
}

const appCurrentVersion = isIos ? Constants?.easConfig["ios"]?.buildNumber : Constants?.easConfig["android"]?.versionCode
const appVersionDeviceINfo = getVersion()
const appBuildNumber = getBuildNumber()

export {
    AsyncStorageConstants,
    deviceWidth,
    deviceHeight,
    isIos,
    appCurrentVersion,
    appVersionDeviceINfo,
    appBuildNumber
}