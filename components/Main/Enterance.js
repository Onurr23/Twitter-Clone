import React from "react";
import {View,Text,StyleSheet,Image,Button,TouchableOpacity} from "react-native";
import Colors from "../../constants/colors";
import Styles from "../../constants/styles";


const Enterance=props=>{

    return(
        <View style={styles.screen}>
            <Image source={require('../../assets/twitter.png')} style={styles.image} />
            <View style={styles.body}>
                <Text style={styles.main}>Şu anda dünyada olup bitenleri gör.</Text>
                <TouchableOpacity style={styles.signup}>
                    <Text style={Styles.text}>Hesap Oluştur</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={{color : Colors.gray}}>Zaten bir hesabın var mı?</Text><TouchableOpacity><Text style={{color : Colors.light,marginLeft : 5}}>Giriş yap</Text></TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    screen : {

        flex : 1,
        backgroundColor : Colors.dark,
        alignItems :'center',
    },
    image :{

        width : 30,
        height : 30,
        marginTop : 15

    },
    main : {

        color : 'white',
        fontFamily : 'open-sans-extraBold',
        fontSize : 28

    },
    body : {

        height : '85%',
        width : '70%',
        justifyContent :'center',
        alignItems  :'center'

    },
    signup:{

        width : '95%',
        height : 45,
        backgroundColor : Colors.light,
        borderRadius : 25,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 30,
        
    },
    footer : {

        flexDirection : 'row'

    }


})

export default Enterance;