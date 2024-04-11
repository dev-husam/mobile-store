import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {AppColorsTheme2} from '../../constants/Colors';
import AppIcon from '../ui/appIcon';
import {AppFonts} from '../../constants/fonts';
import {useLanguage} from '../../hooks/useLanguage.hook';
import PressbleAppIcon from '../ui/pressbleAppIcon';
import AppText from '../ui/AppText';

interface props {
  onPress: () => {};
  style?: ViewStyle;
  label: string;
  onSearch: (text: string) => void;
}
const AppSearch = ({
  onPress,
  label = '',
  onSearch = (text: string) => {},
  style,
}: props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {t} = useTranslation();

  return (
    <Pressable onPress={onPress} style={[styles.container, style && style]}>
      <AppText color={'gray'} alignItems="flex-start" style={{flex: 1}}>
        {t('Search')}
      </AppText>
      {!searchTerm ? (
        <AppIcon name="search" color={AppColorsTheme2.gray} />
      ) : (
        <PressbleAppIcon name="close" onPress={() => setSearchTerm('')} />
      )}
    </Pressable>
  );
};

export default AppSearch;

const styles = StyleSheet.create({
  text: {
    fontFamily: AppFonts.Roboto_Med,
  },
  container: {
    alignItems: 'center',
    height: 50,
    backgroundColor: AppColorsTheme2.offGray,
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});
