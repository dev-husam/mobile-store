import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AppIcon from './appIcon'
import { useTranslation } from 'react-i18next'


const GoBackButton = ({ style }: { style?: ViewStyle }) => {

    const navigation = useNavigation()
    const { i18n } = useTranslation()
    console.log(i18n.language);

    function goBackPressHandler() {
        navigation.goBack()
    }


    return (
        <Pressable
            onPress={goBackPressHandler}
            style={[styles.container, style && style]}>
            <AppIcon name={i18n.language == "en" ? 'chevron-back' : "chevron-forward"} />
        </Pressable>
    )
}

export default GoBackButton

const styles = StyleSheet.create({
    container: { zIndex: 999, position: "absolute", flex: 1, left: 20, borderWidth: 1, padding: 4, borderRadius: 10, }
})