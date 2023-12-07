import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
// import { OtpInput } from 'react-native-otp-entry';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPTextInput from "react-native-otp-textinput"

import Screen from '../../components/Screen'
import { AppColorsTheme2 } from '../../constants/Colors'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import FilledButton from '../../components/ui/common/FilledButton'
import { checkResetPassword, } from '../../apis/Auth.api'
import { httpErrorHandler } from '../../helpers/AppHelpers';
import GoBackButton from '../../components/ui/GoBackButton';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../constants/ScreenNames';


const OtpResetPasswordScreen = ({ route }) => {
    const [code, setCode] = useState("")
    const { email } = route?.params
    const navigation = useNavigation()
    const { t } = useTranslation()


    async function verifyCode() {
        if (!code || code.length < 4) {
            showMessage({ message: "invalid code number", type: "danger" })
            return
        }
        try {
            const response = await checkResetPassword(email, code)
            if (response.data?.isChecked) {
                navigation.navigate(ScreenNames.NewPassword_Screen, { email })
            }

        } catch (error) {
            const errorMessage = httpErrorHandler(error)
            showMessage({ message: errorMessage, type: "danger" })
        }
    }
    return (
        <Screen >
            <KeyboardAwareScrollView>
                <GoBackButton />

                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: AppColorsTheme2.offWhite }}>
                    <View style={{ paddingTop: "15%", }}>
                        <View style={{ width: 220, height: 220, borderRadius: 125, backgroundColor: AppColorsTheme2.secondary200, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: 200, height: 200 }} source={require("../../assets/images/appLogo.png")} />
                        </View>

                    </View>
                    <View style={{ marginVertical: 20, width: "70%" }}>
                        <Text style={{ fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.xLarge, textAlign: "center", marginBottom: 8, color: AppColorsTheme2.secondary }}>Account Verification</Text>
                        <Text style={styles.subTitle}>please enter the 4 digit sent to : </Text>
                        <Text style={styles.subTitle}> {email}</Text>
                    </View>
                    <View style={{ width: "70%", }}>
                        {/* <OtpInput
                            numberOfDigits={4}
                            onTextChange={(text) => setCode(text)}
                            focusColor={AppColorsTheme2.secondary}
                            theme={{ pinCodeContainerStyle: { borderWidth: 3 } }}
                        /> */}
                        <OTPTextInput
                            handleTextChange={(text) => setCode(text)}
                            tintColor={AppColorsTheme2.secondary}
                        />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <FilledButton onPress={verifyCode} style={{ width: "30%" }} >
                            {t("Verify")}
                        </FilledButton>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={styles.subTitle}>
                            {t("DidntReceiveMain")}
                            {" "}
                            <Pressable

                                style={({ pressed }) => [styles.resendButton, pressed && styles.pressed]}>
                                <Text style={{ ...styles.subTitle, color: AppColorsTheme2.secondary, textDecorationLine: "underline" }}>Resend </Text>
                            </Pressable>
                        </Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Screen>
    )
}

export default OtpResetPasswordScreen

const styles = StyleSheet.create({
    subTitle: { fontFamily: AppFonts.Roboto_Med, color: AppColorsTheme2.gray, fontSize: AppSizes.medium, textAlign: "center" },
    resendButton: { justifyContent: "center", alignItems: "center" },
    pressed: { opacity: 0.7 }

})