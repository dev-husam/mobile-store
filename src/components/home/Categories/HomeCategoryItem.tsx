import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../../ui/AppText'
import { AppColorsTheme2 } from '../../../constants/Colors'

const HomeCategoryItem = ({item,selectedItem=0}) => {
  const isSelected=item.id===selectedItem
  const textStyle=isSelected?{textTransform:"capitalize",color:"white"}:{textTransform:"capitalize",}
  return (
    <View style={[{borderWidth:1,marginRight:10,borderRadius:15,padding:10,},isSelected&&{backgroundColor:AppColorsTheme2.secondary,}]}>
      <AppText textStyle={textStyle}>{item?.title?.en}</AppText>
    </View>
  )
}

export default HomeCategoryItem

const styles = StyleSheet.create({})