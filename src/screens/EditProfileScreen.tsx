import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { showMessage } from "react-native-flash-message";
import DateTimePicker from '@react-native-community/datetimepicker';

import { AppColorsTheme2 } from '../constants/Colors'
import AppIcon from '../components/ui/appIcon'
import { AppFonts } from '../constants/fonts'
import { AppSizes } from '../constants/Sizes'
import FilledButton from '../components/ui/common/FilledButton'
import ProfileMapView from '../components/EditProfile/ProfileMapView'
import { getUserProfile, updateUserProfile } from '../apis/users.api'
import { useTranslation } from 'react-i18next';


const EditProfileScreen = () => {
    // const { data } = useFetch({ endPoint: "app-users/profile", method: "get" })
    const [userData, setUserData] = useState(null)
    const [pickedDate, setPickedDate] = useState(new Date());
    const [isPickingDate, setIsPickingDate] = useState(false);
    const { t } = useTranslation()


    function onChangeDateHandler(event, selectedDate) {
        setIsPickingDate(false)
        setPickedDate(selectedDate)
        setUserData({ ...userData, birthDay: selectedDate });
    };



    async function submitPressHandler() {
        try {
            await updateUserProfile(userData)
            showMessage({ message: "update success", type: "success" })

        } catch (error) {
            showMessage({ message: "update failed", type: "danger" })
        }

    }

    async function showPickedDate() {
        setIsPickingDate(true)
    }
    useEffect(() => {
        try {
            fetchUserProfileData()

        } catch (error) {
            console.log(error);
        }
    }, [])
    async function fetchUserProfileData() {
        const data = await getUserProfile()
        setUserData(data)
        if (data?.birthDay) {
            setPickedDate(new Date(data.birthDay))
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: AppColorsTheme2.offWhite, padding: 20 }}>

            <View >
                <ProfileMapView />
            </View>

            <View style={{ flex: 1, padding: 20, }}>

                <View >
                    <Text style={styles.labelText}>
                        {t("Name")}
                    </Text>
                    <View style={styles.action}>
                        <AppIcon name="person" type="Ionicons" size={20} />
                        <TextInput
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            value={userData ? userData.name : ''}
                            onChangeText={(txt) => setUserData({ ...userData, name: txt })}
                            style={styles.textInput}

                        />
                    </View>
                </View>

                <View >
                    <Text style={[styles.labelText, { color: AppColorsTheme2.gray }]}>
                        {t("Email")}
                    </Text>
                    <View style={[styles.action, { borderColor: AppColorsTheme2.gray }]}>
                        <AppIcon name="mail" type="Ionicons" color={AppColorsTheme2.gray} size={20} />
                        <TextInput
                            placeholder="email"
                            editable={false}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            value={userData ? userData.email : ''}
                            onChangeText={(txt) => setUserData({ ...userData, email: txt })}
                            style={[styles.textInput, { color: AppColorsTheme2.gray }]}

                        />
                    </View>
                </View>
                <View >
                    <Text style={[styles.labelText]}>
                        {t("Phone")}
                    </Text>

                    <View style={[styles.action,]}>
                        <AppIcon name="phone" type="FontAwesome" size={20} />
                        <TextInput
                            // editable={false}
                            // placeholder="phone"
                            placeholderTextColor={AppColorsTheme2.gray}
                            autoCorrect={false}
                            value={userData ? userData.phone : ''}
                            onChangeText={(txt) => setUserData({ ...userData, name: txt })}
                            style={[styles.textInput,]}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <Text style={styles.labelText}>
                        {t("Gender")}
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                        <Pressable
                            onPress={() => setUserData({ ...userData, gender: "male" })}
                            style={({ pressed }) => [styles.genderButton, pressed && styles.pressed, userData?.gender == "male" ? styles.selectedButton : userData?.gender == "female" ? null : styles.selectedButton]}>
                            <Text style={{ fontFamily: AppFonts.Roboto_Med }}>Male</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setUserData({ ...userData, gender: "female" })}
                            style={({ pressed }) => [styles.genderButton, pressed && styles.pressed, userData?.gender == "female" ? styles.selectedButton : null]}>
                            <Text style={{ fontFamily: AppFonts.Roboto_Med }}>Female</Text>
                        </Pressable>
                    </View>



                </View>
                <Pressable
                    onPress={showPickedDate}
                    style={styles.sectionContainer}>
                    <Text style={styles.labelText}>
                        {t("DateOfBirth")}
                    </Text>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>


                        <AppIcon type='Fontisto' name='date' />
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            {isPickingDate &&
                                <DateTimePicker
                                    value={pickedDate}
                                    is24Hour={true}
                                    mode="date"

                                    onChange={onChangeDateHandler}
                                />
                            }
                        </View>
                    </View>
                </Pressable>

                <View style={styles.sectionContainer}>
                    <Text style={styles.labelText}>
                        {t("AllowNotification")}
                    </Text>
                    <Switch
                        onValueChange={(currentValue) => setUserData({ ...userData, notificationsEnabled: currentValue })}
                        value={userData?.notificationsEnabled ? userData?.notificationsEnabled : false}
                    />
                </View>
            </View>
            <View >
                <FilledButton onPress={submitPressHandler} >{t("Submit")}</FilledButton>
            </View>


        </View>


    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    labelText: {
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.medium,
        textAlign: "left"
    },
    action: {
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 5,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: 10

    },
    textInput: {
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',

    },

    genderButton: { height: 40, justifyContent: "center", alignItems: "center", padding: 8, borderRadius: 10, minWidth: 80 },
    selectedButton: {
        borderWidth: 1,
        borderColor: AppColorsTheme2.primary
    },
    pressed: { opacity: 0.7 },
    sectionContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }
})