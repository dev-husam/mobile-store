import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Linking } from "react-native";

import AppForceUpdateContent from "../components/ui/AppForceUpdateContent";
import { appCurrentVersion, isIos } from "../constants/CommonConsstats";
import { useModalContext } from "../context/modelContext";
import { getStorageValues, } from "../helpers/AppAsyncStoreage";
import { useAppReadyStore } from "../store/appReady.store";

let forceUpdate = false
export function useAppReady(

) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isForceUpdate, setIsForceUpdate] = useState(false)
  const appSetting = useAppReadyStore((state) => state.appSetting)
  const { showModal } = useModalContext()

  const [fontsLoaded] = useFonts({
    "Roboto-MedItalic": require("../assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Med": require("../assets/fonts/Roboto-Medium.ttf"),
  });




  const appSettingRecommended = isIos ? parseFloat(appSetting?.iosRecommendedVersion) : parseFloat(appSetting?.androidRecommendedVersion)


  useEffect(() => {
    getReadyApp()
  }, [fontsLoaded, appSetting]);


  async function handleUpdatePress() {
    isIos ? Linking.openURL("https://www.apple.com/kw/app-store/") : Linking.openURL("https://play.google.com/store/apps/details?id=com.yamak.mobapp")
  }

  // const message = t("PleaseUpdateTheAppToTheNewerVersion")
  // const title = t("UpdateRequired")
  async function getReadyApp() {
    const lang = await getStorageValues("lang");
    if (!lang) AsyncStorage.setItem("lang", "en");

    if (appCurrentVersion < appSettingRecommended) {
      setIsForceUpdate(true)
      forceUpdate = true
      await showModal({
        content: <AppForceUpdateContent onConfirm={handleUpdatePress} message={"Please Update The App To The Newer Version"} title={"Update Required"} />
      })
      // Alert.alert("Update Required", "please update app to the new version", [{ text: "update", onPress: () => { Linking.openURL("https://beautifier.io/") } }])
    }

    if (fontsLoaded && !forceUpdate) {
      setAppIsReady(true);
      setTimeout(async () => {
        if (!forceUpdate) {
          await SplashScreen.hideAsync()
        }
      }, 3000);;
    }
  }



  return { appIsReady, setAppIsReady }
}
