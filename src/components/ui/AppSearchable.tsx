import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AppText from './AppText';
import AppIcon from './appIcon';
import PressbleAppIcon from './pressbleAppIcon';
import {AppColorsTheme2} from '../../constants/Colors';

interface AppSearchProps {
  onPress: () => void;
  label?: string;
  onSearch?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  inputStyle?: StyleProp<TextStyle>;
}
const AppSearchable = ({
  onPress,
  label = '',
  onSearch = text => {},
  style,
  placeholder = '',
}: AppSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {t} = useTranslation();

  const handleSearch = text => {
    setSearchTerm(text);
    onSearch(text);
  };
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={searchTerm}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
        />
        <AppIcon name="search" color={'gray'} />

        {searchTerm.length > 0 && (
          <Pressable onPress={() => setSearchTerm('')}>
            <AppIcon name="close" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default AppSearchable;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: AppColorsTheme2.offGray,
    borderRadius: 10,
    height: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  cancelButton: {
    marginLeft: 10,
  },
});
