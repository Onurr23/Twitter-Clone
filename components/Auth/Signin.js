import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import Colors from "../../constants/colors";
import * as AuthActions from "../../store/Actions/Auth";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";

const Signin=props=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {navigation}=props;

    const auth = useSelector(state=>state.auth);
    const dispatch = useDispatch();



    const submitHandler=async()=>{

        let user = {

            email : email,
            password : password

        }


       dispatch(AuthActions.signIn(user));

 
     if(auth.user._id){

        navigation.navigate('HomePage')
        
     }else {

        Alert.alert(auth.message)

     }
      
      
    }


    return(
        <View style={styles.screen}> 
          
            <ScrollView>
            <View style={styles.container}>
            <Text style={styles.text}>Twitter'a Giriş Yap</Text>
            <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="E-posta veya kullanıcı adı" value={email} placeholderTextColor={Colors.gray} onChangeText={text=>setEmail(text)} />
            {email !== '' ? <TouchableOpacity onPress={()=>{setEmail('')}} style={styles.icon}><Entypo  name="circle-with-cross" size={16} color={Colors.light} /></TouchableOpacity> : null }
            </View>
            <View style={styles.inputContainer}>
                {password !== '' ? <TouchableOpacity onPress={()=>{setPassword('')}} style={styles.icon}><Entypo  name="circle-with-cross" size={16} color={Colors.light} /></TouchableOpacity>:null }
            <TextInput style={styles.input} placeholder="Şifre" value={password} placeholderTextColor={Colors.gray} onChangeText={text=>setPassword(text)} />
            </View>
            </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity>
                    <Text style={styles.passwordbutton}>Şifreni Mi Unuttun ?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>submitHandler()} disabled={email === '' || password === '' ? false : false} style={email === '' || password === '' ? styles.disabled : styles.signin}>
                    <Text style={{color : '#fff'}}>Giriş Yap</Text>
                </TouchableOpacity>
            </View>
            
           
          
            
        </View>
    )

}

const styles = StyleSheet.create({

    screen:{

        flex : 1,
        backgroundColor : Colors.dark,
        justifyContent : 'space-between',
       
       
       
    },
    text :{

        color : '#fff',
        fontFamily : 'open-sans-extraBold',
        fontSize : 20,
        marginTop :15

    },
    inputContainer :{

        width : '100%',
        borderBottomWidth : 0.3,
        borderBottomColor :Colors.gray,
        padding : 15,
        flexDirection : 'row'
       

    },
    input :{

        color : Colors.light,
        fontSize :16

    },
    container :{

        margin : 15,
        alignItems :'center'
    },
    footer : {

        position : 'absolute',
        bottom : 10,
        left : 0,
        width : '100%',
        height : 35,
        borderTopWidth :0.6,
        borderTopColor : Colors.gray,
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 10,
        alignItems : 'center'

    },
    passwordbutton : {

        color : Colors.light

    },
    signin : {

        width : 80,
        height : 25,
        backgroundColor : Colors.light,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 5,
        borderRadius : 25

    },
    disabled : {

        width : 80,
        height : 25,
        backgroundColor : 'rgba(255,255,255,0.4)',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 5,
        borderRadius : 25

    },
    icon :{

        position : 'absolute',
        right : 0,
        bottom : 16

    }
    
   


})

export default Signin;