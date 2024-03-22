import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppSizes } from '../../../constants/Sizes';
import { AppFonts } from '../../../constants/fonts';
import { AppColorsTheme2 } from '../../../constants/Colors';
import { horizontalScale, verticalScale } from '../../../helpers/Scalling';
import AppText from '../../ui/AppText';
import { useTranslation } from 'react-i18next';
import { CategoriesDataList } from '../../../constants/data';
import HomeCategoryItem from './HomeCategoryItem';



const renderItem = ({ item }: any) => (
  <HomeCategoryItem item={item} />
    // <ServiceItem item={item} />
);

const HomeCategoriesList = () => {

    const { t } = useTranslation();
    // const setServices = useServicesStore((state) => state.setServices)
    // const services = useServicesStore((state) => state.services)
    // const { loading, error, responseData } = useFetchV2({ method: 'get', url: AppApiPath.serviceListApi });

  return (
    <View style={styles.sectionContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <AppText textStyle={styles.labelText}>
                    {t("Categories")}
                </AppText>
                <AppText textStyle={{color:AppColorsTheme2.secondary,fontWeight:"700",fontSize:14}}>
                    {t("ViewAll")}
                </AppText>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={[{id:0,title:{en:"all",ar:"all"}},...CategoriesDataList]}
                renderItem={renderItem}
            />
        </View>
    )
  
}

export default HomeCategoriesList

const styles = StyleSheet.create({
    labelText: { fontSize: AppSizes.large, fontFamily: AppFonts.Roboto_Med,fontWeight:"bold" },
    ViewLabelText: { fontSize: AppSizes.small, color: AppColorsTheme2.secondary, fontFamily: AppFonts.Roboto_Med },
    sectionContainer: {
        padding: horizontalScale(8),
        borderRadius: 10,
        // marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(10),
        // backgroundColor: "white"
    }
})