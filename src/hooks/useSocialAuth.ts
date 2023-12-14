
import { showMessage } from 'react-native-flash-message';

import { useAuthenticationStoreAsync } from "../store/auth.store";
import { loginUserWithSocial, registerUserWithSocial } from "../apis/Auth.api";
import { httpErrorHandler } from "../helpers/AppHelpers";
import { GoogleSignin } from "../config/auth.config"


export function useSocialAuth(type: "login" | "register") {
    const authenticate = useAuthenticationStoreAsync((state) => state.authenticate)

    async function handleSignInWithGoogle() {

        try {
            const hasPlayService = await GoogleSignin.hasPlayServices()
            if (!hasPlayService) return
            const userInfo = await GoogleSignin.signIn().catch(error => {
                console.log("error google ====>");
                console.log({ error: JSON.stringify(error) });
            })
            if (userInfo) {
                const serverRes = await loginUserWithSocial({ googleAccessToken: userInfo?.idToken })
                const { accessToken, user } = serverRes.data
                authenticate(accessToken, user)
                showMessage({ message: "login success", type: "success" })
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    async function handleRegisterWithGoogle() {
        try {
            const hasPlayService = await GoogleSignin.hasPlayServices()
            if (!hasPlayService) return
            const userInfo = await GoogleSignin.signIn()
            if (userInfo) {
                const response = await registerUserWithSocial({ googleAccessToken: userInfo?.idToken })
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