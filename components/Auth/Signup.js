import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/colors";
import {useSelector,useDispatch} from "react-redux";

const Signup=props=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState('');

    const auth = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const {navigation}=props;
    const submitHandler=()=>{

        navigation.navigate('HomePage');

    }


    return(
        <View style={styles.screen}> 
          
            <ScrollView>
            <View style={styles.container}>
            <Text style={styles.text}>Hesabını Oluştur </Text>

            <View style={styles.inputContainer}>
                {name !== '' ? <TouchableOpacity onPress={()=>{setName('')}} style={styles.icon}><Entypo  name="circle-with-cross" size={16} color={Colors.light} /></TouchableOpacity>:null }
            <TextInput style={styles.input} placeholder="Name" value={name} placeholderTextColor={Colors.gray} onChangeText={text=>setName(text)} />
            </View>
            <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="E-mail" value={email} placeholderTextColor={Colors.gray} onChangeText={text=>setEmail(text)} />
            {email !== '' ? <TouchableOpacity onPress={()=>{setEmail('')}} style={styles.icon}><Entypo  name="circle-with-cross" size={16} color={Colors.light} /></TouchableOpacity> : null }
            </View>
            <View style={styles.inputContainer}>
                {password !== '' ? <TouchableOpacity onPress={()=>{setPassword('')}} style={styles.icon}><Entypo  name="circle-with-cross" size={16} color={Colors.light} /></TouchableOpacity>:null }
            <TextInput style={styles.input} placeholder="Password" value={password} placeholderTextColor={Colors.gray} onChangeText={text=>setPassword(text)} />
            </View>
            <View style={styles.inputContainer}>
                {confirm !== '' ? <TouchableOpacity onPress={()=>{setConfirm('')}} style={styles.icon}><Entypo  name="circle-with-cross" size={16} color={Colors.light} /></TouchableOpacity>:null }
            <TextInput style={styles.input} placeholder="Confirm Password" value={confirm} placeholderTextColor={Colors.gray} onChangeText={text=>setConfirm(text)} />
            </View>
            
            </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={()=>submitHandler()} disabled={email === '' || password  === '' || confirm === '' || name === '' ? true : false} style={email === '' || password === '' ? styles.disabled : styles.signin}>
                    <Text style={{color : '#fff'}}>Sign Up</Text>
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
        justifyContent : 'flex-end',
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

export default Signup;