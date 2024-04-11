import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import AppText from '../ui/AppText';
import PopularItems from '../PopularItems';
import AppPressable from '../ui/AppPressable';
import AppIcon from '../ui/appIcon';
import {AppColorsTheme2} from '../../constants/Colors';

const InitSearchScreen = () => {
  const recentSearch = ['hussam', 'maher', 'mohammad'];
  const hsitorySearched = ['computer', 'laptop', 'ps5', 'iphone'];
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, height: '100%'}}>
      <View style={{paddingLeft: 20}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <AppText
              style={[styles.textTitleContainer, {flex: 1}]}
              color="gray"
              size={20}
              weight="800">
              Recent Search
            </AppText>
            <AppPressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <AppText color={AppColorsTheme2.primary}>Clear Search</AppText>
            </AppPressable>
          </View>

          <View>
            {hsitorySearched.map((el, index) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <AppIcon
                    size={35}
                    style={{marginRight: 10}}
                    type="MaterialCommunityIcons"
                    name={'history'}
                  />
                  <AppText
                    textStyle={{textTransform: 'capitalize'}}
                    key={index}>
                    {el}
                  </AppText>
                </View>
              );
            })}
          </View>
        </View>
        {/* products */}
        <View style={{width: '100%'}}>
          <AppText style={styles.textTitleContainer} size={20} weight="800">
            Popular items and recomended
          </AppText>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={recentSearch}
            renderItem={({index, item}) => {
              return <PopularItems item={item} key={index} />;
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default InitSearchScreen;

const styles = StyleSheet.create({
  textTitleContainer: {
    marginVertical: 20,
  },
});
