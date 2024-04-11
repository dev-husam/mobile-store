import {Image, StyleSheet, Text, View} from 'react-native';
import ImagePath from '../constants/AppImgs';
import React from 'react';
import AppPressable from './ui/AppPressable';
import AppText from './ui/AppText';
import {AppColorsTheme2} from '../constants/Colors';

const PopularItems = ({item}) => {
  const imageUrl = item?.image;
  const imageSource = imageUrl ? {uri: imageUrl} : ImagePath.AppLogoPng;
  return (
    <AppPressable style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{width: 100, height: 200}} source={imageSource} />
      </View>
      <View style={{paddingLeft: 10}}>
        <AppText weight="700" size={20} color="gray">
          {item}
        </AppText>
      </View>
    </AppPressable>
  );
};

export default PopularItems;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 250,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: AppColorsTheme2.white,
  },
});
