import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import AppText from '../../ui/AppText';
import {AppColorsTheme2} from '../../../constants/Colors';
import AppIcon from '../../ui/appIcon';
import AppPressable from '../../ui/AppPressable';
import {AppBoxShadow} from '../../../constants/Styles';

const HomeRecommended = () => {
  const {t} = useTranslation();

  return (
    <View style={{marginBottom: 20}}>
      <View style={{marginVertical: 20}}>
        <AppText size={20} weight="700">
          {t('RecommendedItems')}
        </AppText>
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({item, index}) => {
            return <RecommendedItem item={item} key={index} />;
          }}
        />
      </View>
    </View>
  );
};

export default HomeRecommended;

export const RecommendedItem = ({item}) => {
  return (
    <AppPressable style={styles.itemContainer}>
      <Image
        style={{width: 80, height: 100, borderRadius: 10, marginRight: 10}}
        source={{
          uri: 'https://images.pexels.com/photos/11112733/pexels-photo-11112733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        }}
      />
      <View>
        <AppText style={{marginBottom: 8}} size={15} weight="600">
          item name
        </AppText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AppIcon name="star" color={AppColorsTheme2.primary} size={20} />
          <AppText
            style={{marginLeft: 6}}
            size={14}
            color={AppColorsTheme2.black}
            weight="600">
            4.3
          </AppText>
          <AppText color={'#999'}>(1423)</AppText>
        </View>
      </View>
    </AppPressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minWidth: 260,
    height: 120,
    marginRight: 20,
    backgroundColor: AppColorsTheme2.white,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    ...AppBoxShadow,
  },
});
