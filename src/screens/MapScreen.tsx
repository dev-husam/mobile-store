import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, FC, useCallback } from "react";

import AppMap from "../components/map/Map";
import ServicesListMap from "../components/map/servicesListMap";

import useFetchV2 from "../hooks/useFetchV2";

const MapScreen: FC<any> = ({ navigation, route }) => {
  const params = route?.params

  const [selectedServiceId, setselectedServiceId] = useState<string>();

  const { responseData: vehicelsList } = useFetchV2({ url: selectedServiceId ? `services/${selectedServiceId}/vehicles` : "", method: "get" })

  const vehicles = vehicelsList?.list

  useEffect(() => {
    if (params?.id) setselectedServiceId(params?.id)
  }, [params?.id])


  // function handleSelectedService(id: string) {
  //   setselectedServiceId(() => id);
  // }

  const handleSelectedService = useCallback((id: string) => {
    setselectedServiceId(() => id)
  }, [])

  return (
    <>
      <View style={styles.drawerIconContainer}>
        {/* <Ionicons
          name="md-menu"
          size={24}
          color="black"
          onPress={() => {
            navigation.openDrawer();
          }}
        /> */}
      </View>

      <AppMap
        data={vehicles}
      />
      <View
        style={[styles.footerContainer]}
      >

        {/* {vehicles &&

          <View style={{
            backgroundColor: AppColorsTheme2.primary200,
            borderRadius: 10,
            width: "70%", justifyContent: "center",
            alignItems: "center",
          }}>
            <Text style={{ fontSize: 20 }}>Found {vehicles.length} vehicles</Text>
          </View>

        } */}
        <ServicesListMap
          selectedServiceId={selectedServiceId}
          setActiveServiceId={handleSelectedService}
        />
      </View>
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    height: 120,
    width: "100%",
    // opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerIconContainer: {
    paddingTop: 20,
    position: "absolute",
    top: 20,
    left: 30,
    zIndex: 100,
  },
  currentLocationIconContainer: {
    paddingTop: 20,
    position: "absolute",
    top: 20,
    right: 30,
    zIndex: 100,
  },
});
