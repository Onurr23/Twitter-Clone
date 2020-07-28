import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from "./navigation/AppNavigation";
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {Provider} from "react-redux";
import {combineReducers,applyMiddleware,createStore} from "redux";
import AuthReducer from './store/Reducers/Auth';
import thunk from "redux-thunk";
import tweetReducer from './store/Reducers/Tweet';

const rootReducer= combineReducers({

  auth : AuthReducer,
  tweet : tweetReducer

})

const store = createStore(rootReducer,applyMiddleware(thunk));

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
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
    
  );
}


