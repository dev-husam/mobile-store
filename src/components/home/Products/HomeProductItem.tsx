import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColorsTheme2} from '../../../constants/Colors';
import AppText from '../../ui/AppText';
import AppIcon from '../../ui/appIcon';
import AppPressable from '../../ui/AppPressable';
import {ScreenNames} from '../../../constants/ScreenNames';
import {useLanguage} from '../../../hooks/useLanguage.hook';

const widthW = Dimensions.get('window').width;
const widthS = Dimensions.get('screen').width;

const HomeProductItem = ({item, navigation}) => {
  const {isArabic} = useLanguage();
  const productImage = item?.image?.primaryImage?.image;
  const imageSource = productImage
    ? {uri: item?.image?.primaryImage?.image}
    : require('../../../assets/images/appLogo.png');

  const itemName = isArabic ? item.name.ar : item.name.en;
  function onPressHandler() {
    navigation.navigate(ScreenNames.PRODUCT_DETAILS_SCREEN, {_id: item?._id});
  }
  console.log({widthW, widthS});

  return (
    <AppPressable
      style={{alignSelf: 'center', marginHorizontal: 10}}
      onPress={onPressHandler}>
      <View style={styles.item}>
        <Image style={styles.image} source={imageSource} />
        <View style={styles.bookMark}>
          <AppIcon size={15} name="heart-outline" color="white" />
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}>
            <AppText
              size={16}
              weight="600"
              color={AppColorsTheme2.gray11}
              nlines={1}
              alignItems="flex-start">
              {itemName}
            </AppText>
          </View>
          <AppText size={18} weight="700" alignItems="flex-end">
            KD {item.costPrice}
          </AppText>
        </View>
      </View>
    </AppPressable>
  );
};

export default HomeProductItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: AppColorsTheme2.white,
    padding: 10,
    width: 180,
    borderRadius: 10,
  },
  image: {width: 160, height: 160, borderRadius: 10, marginBottom: 30},
  bookMark: {
    top: 160,
    right: 10,
    padding: 8,
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: AppColorsTheme2.primary,
    borderWidth: 2,
    borderColor: AppColorsTheme2.white,
  },

  container: {
    flex: 1,
    height: 240,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
