import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from '../../ui/AppText'
import { useTranslation } from 'react-i18next';
import { AppSizes } from '../../../constants/Sizes';
import { AppFonts } from '../../../constants/fonts';
import { AppColorsTheme2 } from '../../../constants/Colors';
import { horizontalScale } from '../../../helpers/Scalling';
import HomeProductItem from './HomeProductItem';
import { CategoriesDataList, ProductsDataList } from '../../../constants/data';
import { useNavigation } from '@react-navigation/native';
import AddsList from '../AddsList';
import HomeCategoriesList from '../Categories/HomeCategoriesList';


const RenderItem = ({ item,navigation }: any) => (
    <HomeProductItem navigation={navigation} item={item} />
      // <ServiceItem item={item} />
  );

const HomeProductsList = () => {
    const { t } = useTranslation();
    const navigation=useNavigation()

  return (
    <View style={styles.sectionContainer}>
    {/* <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <AppText textStyle={styles.labelText}>
            {t("Products")}
        </AppText>
        <AppText textStyle={{color:AppColorsTheme2.secondary,fontWeight:"700",fontSize:14}}>
                    {t("ViewAll")}
                </AppText>
    </View> */}
    <FlatList
    ListHeaderComponent={()=>{
        return(
            <>
            <AddsList />
            <HomeCategoriesList />
            </>
        )
    }}
    keyExtractor={(item,index)=>{
        return `${item.id}-${index}`}}
    style={{
        //  borderWidth:1,
        //  backgroundColor:"white"
        
        }}
        contentContainerStyle={{flexGrow:1}}
    numColumns={2}
        data={ProductsDataList}
        renderItem={({item})=>(<RenderItem item={item} navigation={navigation} />)}

    />
 
</View>
  )
}

export default HomeProductsList

const styles = StyleSheet.create({
    labelText: { fontSize: AppSizes.large, fontFamily: AppFonts.Roboto_Med,fontWeight:"bold" },
    ViewLabelText: { fontSize: AppSizes.small, color: AppColorsTheme2.secondary, fontFamily: AppFonts.Roboto_Med },
    sectionContainer: {
        flex:1,
        // padding: horizontalScale(8),
        borderRadius: 10,
        // marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(10),
        // backgroundColor: "white"
    }
})