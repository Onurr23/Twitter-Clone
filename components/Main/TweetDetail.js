import React from "react";
import {View,Text,StyleSheet,TouchableOpacity,Image} from "react-native";
import colors from "../../constants/colors";
import { Colors } from "react-native-paper";


const TweetDetail=props=>{

    const tweet = props.route.params.item;

    return(
        <View style={styles.screen}>
            <TouchableOpacity style={styles.tweet}>
            <View style={{flexDirection : 'row'}}>
            <Image source={{uri : tweet.userId.pic}} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.userInfo}>
                <Text style={styles.name}>{tweet.userId.name}</Text><Text style={styles.username}>@Onurr_23</Text>
                </View>
                <View style={styles.tweetContainer}>
                <Text style={styles.tweetText}>{tweet.context}</Text>
                </View>
            </View>
            </View>
            <View style={styles.tweetInfo}>
                <Text style={styles.info}>0 Retweet</Text><Text style={styles.info}>{tweet.like.length} Like</Text>
            </View>
            </TouchableOpacity>
        </View>
       
    )
}

const styles = StyleSheet.create({

    screen:{

        flex : 1,
        backgroundColor : colors.dark

    },
    tweet : {

        width : '100%',
        height : '45%',
        flexDirection : 'column',
        backgroundColor : colors.dark,
        padding : 20
    
    },
    image :{

        width : 75,
        height:75,
        borderRadius : 50
    },
    userInfo:{

        flexDirection : 'row',
        marginLeft : 15
    },
    userInfo:{

        flexDirection : 'row',
        marginLeft : 15
    },
    username : {

        fontSize : 20,
        color : colors.gray,
        fontFamily : 'open-sans'
    },
    tweetContainer :{

        marginLeft : 15,
        width : '90%'
    
    },
    tweetText :{
    
        color : 'white',
        fontFamily : 'open-sans',
        fontSize : 20
    
    },
    name:{

        fontSize : 20,
        color : 'white',
        fontFamily : 'open-sans-bold'
    
    },
    tweetInfo :{
        flexDirection : 'row',
        justifyContent : 'space-around',
        padding : 10,
        borderBottomColor : colors.gray,
        borderTopColor : colors.gray,
        borderBottomWidth : 0.2,
        borderTopWidth : 0.2,
        marginTop :25
    },
    info:{

        color : 'white',
        fontFamily : 'open-sans'

    }


})

export default TweetDetail;