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
import { RootFun } from './RootFun';
import { ModalContextProvider } from './src/context/modelContext';
import AppFlashMessage from './src/components/ui/AppFlashMessage';


function App() {


  return (
    <>
      <StatusBar />
      <ModalContextProvider>
        <RootFun />
      </ModalContextProvider>
      <AppFlashMessage />
    </>
  );
}



export default App;
