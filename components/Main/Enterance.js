import React from "react";
import {View,Text,StyleSheet,Image,Button,TouchableOpacity} from "react-native";
import Colors from "../../constants/colors";


const Enterance=props=>{

    return(
        <View style={styles.screen}>
            <Image source={require('../../assets/twitter.png')} style={styles.image} />
            <View style={styles.body}>
                <Text>Şu anda dünyada olup bitenleri gör.</Text>
                <TouchableOpacity>
                    <Text>Hesap Oluştur</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>Zaten bir hesabın var mı? <Button title="Giriş yap"/></Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    screen : {

        flex : 1,
        backgroundColor : Colors.dark,
        alignItems :'center'
    

    },
    image :{

        width : 30,
        height : 30,
        marginTop : 15

    }


})

export default Enterance;