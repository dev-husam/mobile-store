import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React from "react";

import Screen from "../components/Screen";
import { AppColorsTheme2 } from "../constants/Colors";
import ButtonSection from "../components/Profile/ButtonSection";
import { useTranslation } from "react-i18next";
import { AppSizes } from "../constants/Sizes";
import ProfileHeaders from "../components/Profile/ProfileHeaders";
import ProfileMainButtons from "../components/Profile/ProfileMainButtons";
const ProfileScreen = () => {
  const { t } = useTranslation();
  return (
    <Screen style={{ backgroundColor: AppColorsTheme2.offWhite }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
        }}
      >

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              marginTop: 10,
              fontSize: AppSizes.large,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {t("MyProfile")}
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1, }}>
        <ProfileHeaders />
        <ProfileMainButtons />
        <ButtonSection />
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Powered By Yamak
        </Text>

      </ScrollView>
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({

  pressed: {
    opacity: 0.7,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.6,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: "black",
    resizeMode: "contain",
  },


});