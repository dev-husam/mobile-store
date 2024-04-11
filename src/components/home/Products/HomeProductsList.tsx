import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../ui/AppText';
import {useTranslation} from 'react-i18next';
import {AppSizes} from '../../../constants/Sizes';
import {AppFonts} from '../../../constants/fonts';
import {AppColorsTheme2} from '../../../constants/Colors';
import {horizontalScale} from '../../../helpers/Scalling';
import HomeProductItem from './HomeProductItem';
import {useNavigation} from '@react-navigation/native';
import AddsList from '../AddsList';
import HomeCategoriesList from '../Categories/HomeCategoriesList';
import useFetchV2 from '../../../hooks/useFetchV2';
import {AppApiPath} from '../../../apis/apisPath';
import HomeRecommended from './HomeRecommendedI';

const RenderItem = ({item, navigation}: any) => (
  <HomeProductItem navigation={navigation} item={item} />
  // <ServiceItem item={item} />
);

const HomeProductsList = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: {en: 'all', ar: 'الكل'},
  });
  const {loading, error, responseData} = useFetchV2({
    method: 'get',
    url: AppApiPath.productsAPI,
  });

  function handleSelectCategory(category) {
    setSelectedCategory(category);
  }

  return (
    <View style={styles.sectionContainer}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <>
              <AddsList />
              <HomeCategoriesList onSelectCategory={handleSelectCategory} />
            </>
          );
        }}
        ListFooterComponent={() => {
          return <HomeRecommended />;
        }}
        keyExtractor={(item, index) => {
          return `${item.id}-${index}`;
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        numColumns={2}
        data={responseData?.list || []}
        renderItem={({item}) => (
          <RenderItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default HomeProductsList;

const styles = StyleSheet.create({
  labelText: {
    fontSize: AppSizes.large,
    fontFamily: AppFonts.Roboto_Med,
    fontWeight: 'bold',
  },
  ViewLabelText: {
    fontSize: AppSizes.small,
    color: AppColorsTheme2.secondary,
    fontFamily: AppFonts.Roboto_Med,
  },
  sectionContainer: {
    flex: 1,
    // padding: horizontalScale(8),
    borderRadius: 10,
    // marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
    // backgroundColor: "white"
  },
});
