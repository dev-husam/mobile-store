import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import PasswordReset from "../../assets/images/password-reset.svg"
import { AppColorsTheme2 } from '../../constants/Colors'
import { TextInput } from 'react-native-gesture-handler'
import AppIcon from '../ui/appIcon'
import FilledButton from '../ui/common/FilledButton'
import { AppFonts } from '../../constants/fonts'
import { AppSizes } from '../../constants/Sizes'
import { useTranslation } from 'react-i18next'


const EmailForgotPassword = ({ onSubmit, setEmail }) => {

    const { t } = useTranslation()

    return (
        <View style={{ flex: 1, backgroundColor: AppColorsTheme2.offWhite, }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }} >
                <View>
                    <Text style={{ marginVertical: 4, textAlign: "center", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium }}>
                        {t("EnterEmailAddress")}
                    </Text>
                    <Text style={{ marginVertical: 4, color: "gray", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium }}>
                        {t("WeWillSendYouMail")}
                    </Text>

                </View>
                <PasswordReset width={100} height={100} />

                <View style={{ height: 40, borderWidth: 1, width: "75%", borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 4 }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <TextInput
                            autoCapitalize='none'
                            onChangeText={(text) => setEmail(text)}
                            // value={values.email}
                            placeholder={t("Email")}
                            style={{ textAlign: "right", marginRight: 10 }}
                        />
                    </View>
                    <AppIcon name="mail" color="gray" />
                </View>

                <View>
                    <FilledButton onPress={onSubmit} >
                        <Text>{t("Submit")}</Text>
                    </FilledButton>
                </View>

            </View>
        </View>
    )
}

export default EmailForgotPassword

const styles = StyleSheet.create({})