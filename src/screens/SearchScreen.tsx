import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../components/AppHeader';
import InitSearchScreen from '../components/Search/InitSearchScreen';

const SearchScreen = () => {
  const [searchText, setSeachText] = useState('');

  return (
    <View>
      <AppHeader searchble showHeader={false} title="Search" />
      {searchText ? <Text>Search result </Text> : <InitSearchScreen />}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
