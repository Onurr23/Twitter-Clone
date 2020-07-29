import React, { Profiler } from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Platform, Button,TouchableOpacity,Text,Image} from "react-native";
import {Ionicons,FontAwesome,MaterialCommunityIcons} from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../components/Main/Home";
import Profile from "../components/Main/Profile";
import User from "../components/Main/User";
import Messages from "../components/Main/Messages";
import Enterance from "../components/Main/Enterance";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";
import Colors from "../constants/colors";
import DrawerContent from "../components/Drawer/DrawerContent";
import colors from "../constants/colors";
import TweetDetail from "../components/Main/TweetDetail";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const dontShowHeader=({

    headerShown : false

})

const authHeader = ({ navigation, route }) => ({
    headerStyle :{
      backgroundColor : Colors.dark,
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      },
  },
  headerTitle : ()=> <Ionicons name="logo-twitter" color={Colors.light} size={24} />,
  headerTitleAlign :'center',
  headerLeft : ()=> <TouchableOpacity onPress={()=>{navigation.goBack()}} ><Text style={{color : Colors.light,marginLeft : 10}}>Vazgeç</Text></TouchableOpacity>,
  headerRight : ()=> <TouchableOpacity><MaterialCommunityIcons name="dots-horizontal" color={Colors.light} size={24} /></TouchableOpacity>
  })

  const homeHeader = ({ navigation, route }) => ({
    headerStyle :{
      backgroundColor : Colors.dark,
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      },
  },
  headerTitle : ()=> <Ionicons name="logo-twitter" color={Colors.light} size={24} />,
  headerTitleAlign :'center',
  headerLeft : ()=> <TouchableOpacity onPress={()=>{navigation.goBack()}}><Image source={{uri : 'https://pbs.twimg.com/profile_images/1206237605806985221/pW65Z4C9_400x400.jpg'}} style={{width : 32,height :32,marginLeft : 10,borderRadius : 50}} /></TouchableOpacity>,
  headerRight : ()=> <TouchableOpacity><MaterialCommunityIcons name="dots-horizontal" color={Colors.light} size={24} /></TouchableOpacity>
  })

  const tweetHeader=({ navigation, route }) => ({
    headerStyle :{
      backgroundColor : Colors.dark,
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      },
  },
  headerTitle : ()=> <Text style={{color : 'white',fontSize : 18,fontFamily : 'open-sans-bold'}}>Tweet</Text>,
  headerTitleAlign :'center',
  headerLeft : ()=> <TouchableOpacity style={{marginLeft : 10}} onPress={()=>{navigation.goBack()}}><Ionicons name="ios-arrow-back" color={colors.light} size={24} /></TouchableOpacity>,
 
  })

const HomeStack=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Enterance" component={Enterance} options={dontShowHeader} />
            <Stack.Screen name="Signin" component={Signin} options={authHeader} />
            <Stack.Screen name="Signup" component={Signup} options={authHeader} />
            <Stack.Screen name="HomePage" component={Home} options={homeHeader} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="TweetDetail" component={TweetDetail} options={tweetHeader} />
        </Stack.Navigator>
    )
}

const AppNavigation=props=>{

    return(
        <NavigationContainer>
        <Drawer.Navigator drawerStyle={{backgroundColor : colors.dark}} drawerContent={() =>  <DrawerContent/> } >
            <Drawer.Screen name="Home" component={HomeStack}/>
            <Drawer.Screen name="Messages" component={Messages} />
        </Drawer.Navigator>
        </NavigationContainer>
    )

}

export default AppNavigation;