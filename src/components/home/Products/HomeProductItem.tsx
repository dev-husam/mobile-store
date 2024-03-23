import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColorsTheme2 } from '../../../constants/Colors';
import AppText from '../../ui/AppText';
import AppIcon from '../../ui/appIcon';
import AppPressable from '../../ui/AppPressable';
import { ScreenNames } from '../../../constants/ScreenNames';

const HomeProductItem = ({item,navigation}) => {

   function onPressHandler(){
    navigation.navigate(ScreenNames.PRODUCT_DETAILS_SCREEN,{_id:item?.id})
    }
    
  return (
    <AppPressable onPress={onPressHandler} style={{flex:1,height:220,marginHorizontal:10,marginBottom:20,borderRadius:20,overflow:"hidden"}}>
        <View style={{backgroundColor:AppColorsTheme2.primary200,height:150,justifyContent:"center",alignItems:"center",borderRadius:20,}}>
            <Image style={{width:150,height:150}} source={require("../../../assets/images/appLogo.png")} />
        </View>
        <View style={{marginTop:8}}>
        <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <AppText color={AppColorsTheme2.gray11} alignItems="flex-start">{item.title.en}</AppText>
        <View style={{flexDirection:"row"}}>
            <AppIcon color='gold' size={16} name='star' />
            <AppText>
            5.0
            </AppText>
        </View>

        </View>
        <AppText size={18} weight="700" alignItems="flex-start">KD {item.price}</AppText>

        </View>
     
    </AppPressable>
  )
}

export default HomeProductItem

const styles = StyleSheet.create({})