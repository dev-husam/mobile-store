import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

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
                    <Text style={{ marginVertical: 10, textAlign: "center", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium }}>
                        {/* Enter email address */}
                        {t("EnterEmailAddress")}
                    </Text>
                    <Text style={{ marginVertical: 10, color: "gray", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium }}>
                        {/* we will send your mail with Confirmation code */}
                        {t("WeWillSendYouMail")}
                    </Text>

                </View>

                <View style={{ height: 40, borderWidth: 1, width: "75%", borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <TextInput
                            autoCapitalize='none'
                            onChangeText={(text) => setEmail(text)}
                            // value={values.email}
                            placeholder={t("Email")}
                            style={{ textAlign: "right" }}
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