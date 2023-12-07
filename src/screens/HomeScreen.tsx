import { Platform, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AppColorsTheme2 } from "../constants/Colors";
import ServicesList from "../components/home/ServicesList";
import VehiclesList from "../components/home/VehiclesList";
import ViewMap from "../components/home/ViewMap";
import AddsList from "../components/home/AddsList";
import { getAllServices } from "../apis/services.api";
import { getAllAdds } from "../apis/common.api";





export type Props = {
  name?: string;
  baseEnthusiasmLevel?: number;
};
const HomeScreen: React.FC<Props> = () => {

  const [refreshing, setRefreshing] = useState(false);

  function pullToRefreshFunction() {
    setRefreshing(true)
    callHomeScreenApi()
    setRefreshing(false)
  }

  async function callHomeScreenApi() {
    const serviceList = await getAllServices()
    const addsList = await getAllAdds()
    console.log(addsList);

  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={pullToRefreshFunction}
        />}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ServicesList />
        <AddsList />
        <VehiclesList />
        <ViewMap />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColorsTheme2.offWhite

  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
