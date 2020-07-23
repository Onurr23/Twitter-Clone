import React, { Profiler } from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Platform, Button,TouchableOpacity,Text} from "react-native";
import {Ionicons,FontAwesome,MaterialCommunityIcons} from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Auth from "../components/Auth/Auth";
import Home from "../components/Main/Home";
import Profile from "../components/Main/Profile";
import User from "../components/Main/User";
import Messages from "../components/Main/Messages";
import Enterance from "../components/Main/Enterance";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";
import Colors from "../constants/colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const dontShowHeader=({

    headerShown : false

})

const HomeStack=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Enterance" component={Enterance} options={dontShowHeader} />
            <Stack.Screen name="Signin" component={Signin} options={({ navigation, route }) => ({
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
        })} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="HomePage" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
    )
}



const AppNavigation=props=>{

    return(
        <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeStack}/>
            <Drawer.Screen name="Messages" component={Messages} />
        </Drawer.Navigator>
        </NavigationContainer>
    )

}

export default AppNavigation;