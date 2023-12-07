import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppColorsTheme2 } from '../../constants/Colors'
import AppIcon from '../ui/appIcon'
import { AppFonts } from '../../constants/fonts'
import { useLanguage } from '../../hooks/useLanguage.hook'
import PressbleAppIcon from '../ui/pressbleAppIcon'


const AppSearch = ({ label = "", onSearch = (text: string) => { } }) => {
    const { isArabic } = useLanguage()
    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchTerm);

    useEffect(() => {
        onSearch(searchTerm)
    }, [searchTerm]);

    const handleBlur = () => {
        // Trigger onSearch when the user finishes typing
        onSearch(searchTerm);
    };
    return (
        <Pressable
            style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center" }}>

                <TextInput
                    onChangeText={(text) => setSearchTerm(text)}
                    value={searchTerm}
                    placeholder={label}
                    onBlur={handleBlur}
                    style={{ flex: 1, textAlign: isArabic ? "right" : "left" }} />
            </View>
            {!searchTerm ? <AppIcon name='search' /> : <PressbleAppIcon name='close' onPress={() => setSearchTerm("")} />}

        </Pressable>
    )
}

export default AppSearch

const styles = StyleSheet.create({
    text: {
        fontFamily: AppFonts.ROBOTO_Med_Itl
    },
    container: { borderWidth: 1, height: 50, backgroundColor: AppColorsTheme2.secondary200, borderRadius: 20, padding: 10, flexDirection: "row" }
})