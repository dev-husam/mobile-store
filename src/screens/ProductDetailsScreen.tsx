import { Image, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { VehicelsDetailsPh } from '../components/placeHolders/VehicelsDetailsPh'
import ImgPath from "../constants/AppImgs"
import Screen from '../components/Screen'
import { AppColorsTheme2 } from '../constants/Colors'
import GoBackButton from '../components/ui/GoBackButton'
import { AppSizes } from '../constants/Sizes'
import ShareWithus from '../components/vehicleDetails/ShareWithus'
import YourSaftyMatter from '../components/vehicleDetails/YourSaftyMatter'
import AppSimpleLoader from '../components/ui/AppSimpleLoader'
import { useAuthenticationStoreAsync } from '../store/auth.store'
import { useUserLocationStore } from '../store/userLocation.store'
import { useLanguage } from '../hooks/useLanguage.hook'
import { getVehicleById } from '../apis/vehicles.api'
import { sendOrderRequests } from '../apis/requests.api'
import { getWhatsAppMessage } from '../constants/messages'
import AppIcon from '../components/ui/appIcon'
import { AppFonts } from '../constants/fonts'
import { wait } from '../helpers/AppHelpers'
import AppText from '../components/ui/AppText'
import AvailableServiceList from '../components/vehicleDetails/AvailableServiceList'
import { ProductsDataList } from '../constants/data'

const ProductDetailsScreen = ({route}) => {
  const { _id, } = route?.params
  const { t } = useTranslation();


  const [vehicle, setVehicle] = useState()
  const [product, setProduct] = useState()
  
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [isWhatsLoading, setIsButtonWhatsLoading] = useState(false)
  const [isCallLoading, setIsCallLoading] = useState(false)
  const [pickedServices, setPickedServices] = useState([])
  const user = useAuthenticationStoreAsync((state) => state.user)
  const userLocation = useUserLocationStore((state) => state.userLocation)

  const { currentLanguage } = useLanguage()
  const driverPhone = vehicle?.currentDriver?.phoneNum
  const driver = vehicle?.currentDriver

  console.log({product});
  
  useEffect(() => {
      if (_id) 
      {
       const foundProduct= ProductsDataList.find((item)=>{return item.id===_id})
       setProduct(foundProduct)
      }
  }, [])
  async function getProductData() {
    try {
        setIsFetchingData(true)
        const response = await getVehicleById(_id)
        setVehicle(response)
    } catch (error) {
        console.log(error)
    } finally {
        setIsFetchingData(false)

    }
}

  async function fetchVehicleData() {
      try {
          setIsFetchingData(true)
          const response = await getVehicleById(_id)
          setVehicle(response)
      } catch (error) {
          console.log(error)
      } finally {
          setIsFetchingData(false)

      }
  }


  async function whatsappButtonPressHandler() {
      // if (pickedServices.length == 0) {
      //     showMessage({ message: "services should be selected", type: "danger" })
      //     return

      setIsButtonWhatsLoading(true)

      const dataToSend = {
          driverId: driver?._id,
          services: pickedServices,
          userId: user?._id,
          platform: "mobile",
          payload: {
              userLocation,
              mobileType: Platform.OS,
              button: "whatsapp"
          }
      }
      try {
          const response = await sendOrderRequests(dataToSend)

          const servicesName = pickedServices.map(service => service.name[currentLanguage])

          const messageToSend = getWhatsAppMessage(currentLanguage, servicesName)

          Linking.openURL(`whatsapp://send?text=${messageToSend}&phone=${driverPhone}`)
      } catch (error) {

      } finally {
          setIsButtonWhatsLoading(false)
      }

  }
  async function CallButtonPressHandler() {

      setIsCallLoading(true)

      const dataToSend = {
          driverId: driver?._id,
          services: pickedServices,
          userId: user?._id,
          platform: "mobile",
          payload: {
              userLocation,
              mobileType: Platform.OS,
              button: "call"
          }
      }
      try {
          const response = await sendOrderRequests(dataToSend)
          await wait(1222)
          Linking.openURL(`tel:${driverPhone}`)

          // Linking.openURL(`whatsapp://send?text=${messageToSend}&phone=${driverPhone}`)
      } catch (error) {

      } finally {
          setIsCallLoading(false)
      }

  }

  if (isFetchingData)
      return (
          <VehicelsDetailsPh />
      )
  return (
    <View style={{flex:1}}>

<GoBackButton />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, }} >
          
              <View style={{ borderBottomWidth: 0.3, justifyContent: "center", alignItems: "center", backgroundColor: AppColorsTheme2.white }}>
                  <Image style={{ height: 250, width: 300 }} resizeMode={"contain"} source={ImgPath.AppLogoPng} />
              </View>
              <View style={{}}>

                  <View style={{ paddingTop: 10 }}>
                      <Text style={{ fontSize: AppSizes.medium, fontWeight: "600", textAlign: "center", color: AppColorsTheme2.primary, justifyContent: "center", alignItems: "center", textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med }}>
                          {vehicle?.company?.name[currentLanguage]}
                      </Text>
                  </View>
                  <View style={{ padding: 20, }}>
           
                      <ShareWithus />
           
                      <YourSaftyMatter />
                  </View>
              </View>
              {/* <VehiclesList selectedId={_id} /> */}
          </ScrollView>
          <View style={{ justifyContent: "space-around", alignItems: "center", height: 60, flexDirection: "row", borderTopWidth: 0.3, borderColor: AppColorsTheme2.gray11, paddingHorizontal: "5%" }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: AppColorsTheme2.black, fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, }}>
                      {t("Price")}</Text>
                  <Text style={{ color: AppColorsTheme2.black, fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, }}>
                      KD 500</Text>

              </View>
              {/* <Pressable
                  onPress={whatsappButtonPressHandler}
                  style={({ pressed }) => [styles.whatsappButton, pressed && styles.pressed]}>
                  {isWhatsLoading ? (
                      <AppSimpleLoader />
                  ) : (
                      <>
                          <Image style={{ width: 40, height: 40 }} source={require("../assets/images/whatsapp.png")} />
                          <Text style={{ color: "white", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.xMedium }}>

                              {t("OrderNow")}
                          </Text>
                      </>
                  )}

              </Pressable> */}
              <Pressable

                  onPress={CallButtonPressHandler}
                  style={({ pressed }) => [styles.whatsappButton, pressed && styles.pressed]}>
                  {isCallLoading ? (
                      <AppSimpleLoader />
                  ) : (<>
                      <AppIcon color='white' style={{ marginRight: 8 }} name='cart' size={25} />
                      <Text style={{ color: "white", fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.xMedium }}>
                          {t("AddToCart")}
                      </Text>
                  </>)}

              </Pressable>


          </View>

          </View> 
           )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7
},
whatsappButton: {
    minWidth: 160,
    paddingHorizontal: 10,
    backgroundColor: AppColorsTheme2.secondary
    , height: 40, borderRadius: 10,
    justifyContent: "center", alignItems: "center", flexDirection: "row"
},

heading: { fontFamily: AppFonts.Roboto_Med, fontSize: AppSizes.medium, paddingHorizontal: 10, marginBottom: 10, textAlign: "left" },
iconContainer: { width: 60, height: 60, justifyContent: "center", alignItems: "center", },
dirverText: { alignItems: "flex-start", fontFamily: AppFonts.Roboto_Med, textAlign: "left", fontSize: AppSizes.medium, marginLeft: 10 }

})