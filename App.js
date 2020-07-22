import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from "./navigation/AppNavigation";
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

const fetchFonts = () =>{

  return Font.loadAsync({

    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-extraBold' : require('./assets/fonts/OpenSans-ExtraBold.ttf')
})

}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded){

    return(
      <AppLoading startAsync={fetchFonts} onFinish={()=>setFontLoaded(true)} />
    ) 

  }
  return (
    <AppNavigation/>
  );
}


