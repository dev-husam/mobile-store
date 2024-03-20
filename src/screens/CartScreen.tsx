import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppHeader from '../components/AppHeader'

const CartScreen = () => {
  return (
    <View style={{flex:1}}>
        <AppHeader title='Cart ' />
      <Text>CartScreen</Text>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({})