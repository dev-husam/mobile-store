/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import 'react-native-reanimated'
import 'react-native-gesture-handler'

import { RootFun } from './RootFun';
import { I18nextProvider } from 'react-i18next';
import { ModalContextProvider } from './src/context/modelContext';
import AppFlashMessage from './src/components/ui/AppFlashMessage';
import i18next from "./src/translation/Translation.config"

function App() {


  return (
    <>
      <StatusBar animated={true} barStyle={"dark-content"} />
      <I18nextProvider i18n={i18next} >
        <ModalContextProvider>
          <RootFun />
        </ModalContextProvider>
      </I18nextProvider>
      <AppFlashMessage />
    </>
  );
}



export default App;
