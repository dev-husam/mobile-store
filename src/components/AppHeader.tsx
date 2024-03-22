import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ImagePath from "../constants/AppImgs"
import AppText from './ui/AppText';
import AppIcon from './ui/appIcon';
import { AppColorsTheme2 } from '../constants/Colors';
import PressbleAppIcon from './ui/pressbleAppIcon';
import { useLanguage } from '../hooks/useLanguage.hook';
import AppSearch from './home/Search';


const AppHeader = ({ RightIcon = null, rightIconProps, showBack = false, title = "", logo = true, navigation = undefined }) => {
    const { isArabic } = useLanguage()
    const insets = useSafeAreaInsets();


    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
<View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>



            <View style={{ flex: 1, alignItems: "flex-start" }}>
                {showBack &&
                    <PressbleAppIcon color={AppColorsTheme2.white} onPress={() => navigation?.goBack()} name={isArabic ? "chevron-forward" : "chevron-back"} size={30} />
                }
            </View>

            {
                title && (
                    <View style={{ flex: 4, alignItems: "center" }}>
                        <AppText color={AppColorsTheme2.secondary} size={25} >
                            {title}
                        </AppText>
                    </View>
                )
            }


            <View style={{ alignSelf: "center", flex: 1, alignItems: "flex-end" }}>


                {RightIcon ? <RightIcon {...rightIconProps} /> : (<Image  style={{ width: 80, height: 50 }} source={ImagePath.AppLogoPng} />
                )}

            </View>


            </View>
            <View style={{paddingVertical:10}}>
            <AppSearch label='Search Anything ...' style={{width:"100%"}} />
            </View>
        
        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        paddingHorizontal: 16,
        backgroundColor: AppColorsTheme2.primary,
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20
    }
})