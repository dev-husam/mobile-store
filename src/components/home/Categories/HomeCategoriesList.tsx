import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppSizes} from '../../../constants/Sizes';
import {AppFonts} from '../../../constants/fonts';
import {AppColorsTheme2} from '../../../constants/Colors';
import {horizontalScale, verticalScale} from '../../../helpers/Scalling';
import AppText from '../../ui/AppText';
import {useTranslation} from 'react-i18next';
import HomeCategoryItem from './HomeCategoryItem';
import useFetchV2 from '../../../hooks/useFetchV2';
import {AppApiPath} from '../../../apis/apisPath';
import {useCategoriesStore} from '../../../store/categories.store';

const RenderItem = ({item, index, itemRef, activeIndex, onPress}: any) => (
  <HomeCategoryItem
    itemRef={itemRef}
    index={index}
    onPress={onPress}
    activeIndex={activeIndex}
    item={item}
  />
);

const HomeCategoriesList = ({onSelectCategory}) => {
  const {t} = useTranslation();
  const setCategories = useCategoriesStore(state => state.setCategories);
  const categories = useCategoriesStore(state => state.categories);
  const itemRef = useRef([]);
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const {loading, error, responseData} = useFetchV2({
    method: 'get',
    url: AppApiPath.categoriesAPI,
  });

  useEffect(() => {
    if (responseData?.list) setCategories(responseData?.list);
  }, [responseData]);

  function handleSelectCategory(index: number) {
    setActiveIndex(prev => index);
    flatListRef.current?.scrollToIndex({animated: true, index: index});

    // onSelectCategory();
  }
  return (
    <View style={styles.sectionContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}>
        <AppText textStyle={styles.labelText}>{t('Categories')}</AppText>
        <AppText
          textStyle={{
            color: AppColorsTheme2.secondary,
            fontWeight: '700',
            fontSize: 14,
          }}>
          {t('ViewAll')}
        </AppText>
      </View>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{paddingVertical: 10, marginBottom: 10}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={[{id: 0, name: {en: 'all', ar: 'الكل'}}, ...categories]}
        renderItem={({index, item}) => {
          return (
            <RenderItem
              itemRef={el => {
                itemRef.current[index] = el;
              }}
              index={index}
              activeIndex={activeIndex}
              onPress={() => {
                handleSelectCategory(index);
              }}
              item={item}
            />
          );
        }}
      />
    </View>
  );
};

export default HomeCategoriesList;

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
    // padding: horizontalScale(8),
    borderRadius: 10,
    // marginVertical: verticalScale(10),
    // marginHorizontal: horizontalScale(10),
  },
});
