import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppText from '../../ui/AppText';
import {AppColorsTheme2} from '../../../constants/Colors';
import AppIcon from '../../ui/appIcon';
import {AppBoxShadow} from '../../../constants/Styles';
import AppPressable from '../../ui/AppPressable';

const HomeCategoryItem = ({item, itemRef, index, activeIndex = 0, onPress}) => {
  const isSelected = index === activeIndex;
  const textStyle = isSelected
    ? {textTransform: 'capitalize', color: 'white'}
    : {textTransform: 'capitalize'};

  return (
    <AppPressable
      onPress={onPress}
      ref={itemRef}
      style={[
        styles.container,
        isSelected && {backgroundColor: AppColorsTheme2.secondary},
      ]}>
      <AppIcon
        type="FontAwesome5"
        name="laptop-code"
        size={22}
        color={isSelected ? AppColorsTheme2.white : AppColorsTheme2.black}
        style={{marginRight: 10}}
      />
      <AppText weight="500" textStyle={textStyle}>
        {item?.name?.en}
      </AppText>
    </AppPressable>
  );
};

export default HomeCategoryItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColorsTheme2.white,
    marginRight: 10,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    ...AppBoxShadow,
  },
});
