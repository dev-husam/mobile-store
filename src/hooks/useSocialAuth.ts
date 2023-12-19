
import { showMessage } from 'react-native-flash-message';

import { useAuthenticationStoreAsync } from "../store/auth.store";
import { loginUserWithSocial, registerUserWithSocial } from "../apis/Auth.api";
import { httpErrorHandler } from "../helpers/AppHelpers";
import { GoogleSignin } from "../config/auth.config"
import { Alert } from 'react-native';
import { Navigation } from '../../RootFun';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../constants/ScreenNames';


export function useSocialAuth(type: "login" | "register") {
    const navigation = useNavigation()
    const authenticate = useAuthenticationStoreAsync((state) => state.authenticate)

    async function handleSignInWithGoogle() {

        try {
            const hasPlayService = await GoogleSignin.hasPlayServices()
            if (!hasPlayService) return
            const userInfo = await GoogleSignin.signIn().catch(error => {
                console.log("error google ====>");
                console.log({ error: error });
            })
            if (userInfo) {
                const serverRes = await loginUserWithSocial({ googleAccessToken: userInfo?.idToken })
                const { accessToken, user } = serverRes?.data
                authenticate(accessToken, user)
                showMessage({ message: "login success", type: "success" })
            }
        }
        catch (error) {
            if (error == "user not registered") {
                Alert.alert("login failed ", "email must register first")
                navigation.navigate(ScreenNames.Register_Screen)
            }
            console.log("backend error ====>", error)

        }
    }

    async function handleRegisterWithGoogle() {
        try {
            const hasPlayService = await GoogleSignin.hasPlayServices()
            if (!hasPlayService) return
            const userInfo = await GoogleSignin.signIn()
            console.log({ userInfo });

            if (userInfo) {
                const response = await registerUserWithSocial({ googleAccessToken: userInfo?.idToken })
                console.log({ response });

                const { accessToken, user } = response.data
                authenticate(accessToken, user)
            }

        } catch (error) {
            console.log("eroror", JSON.stringify(error));

            const errorMessage = httpErrorHandler(error)
            showMessage({ message: errorMessage, type: "danger" })
        }
    }
    return { handleRegisterWithGoogle, handleSignInWithGoogle }

}