import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "react-native-localize";
import { I18nManager } from "react-native";
import { AsyncStorageConstants } from "../constants/CommonConsstats";

;

const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => { },
  detect: async function (callback: (lang: string) => void) {
    try {
      //get stored language from Async storage
      // AsyncStorage.clear()
      await AsyncStorage.getItem(AsyncStorageConstants.languageKey).then((language) => {
        console.log({ language });

        if (language) {
          //if language was stored before, use this language in the app
          return callback(language);
        } else {
          //if language was not stored yet, use device's locale
          const language = getLocales()[0]?.languageCode || "en"


          if (language === "ar") {
            I18nManager.forceRTL(true);
            I18nManager.allowRTL(true);
            I18nManager.swapLeftAndRightInRTL(true);
          } else {
            I18nManager.forceRTL(false);
            I18nManager.allowRTL(false);
          }
          AsyncStorage.setItem(AsyncStorageConstants.languageKey, language);
          return callback(language);
        }
      });
    } catch (error) {
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(AsyncStorageConstants.languageKey, language);
    } catch (error) { }
  },
};

export { languageDetectorPlugin };
