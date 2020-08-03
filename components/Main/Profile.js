import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,SafeAreaView, Image,FlatList,ActivityIndicator} from "react-native";
import colors from "../../constants/colors";
import {FontAwesome,EvilIcons} from "@expo/vector-icons";
import {useDispatch,useSelector} from "react-redux";
import * as tweetActions from "../../store/Actions/Tweet";
import Tweet from "./Tweet";

const Profile=props=>{

    const dispatch= useDispatch();
    const id = props.route.params.id;
    let tweets = useSelector(state=>state.tweet.userTweets);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const {navigation} = props;


    useEffect(()=>{

        setLoading(true);
        loadTweets();
        setLoading(false);

    },[dispatch]);

    
    const loadTweets=async()=>{

        setRefresh(true);
        await dispatch(tweetActions.getUserTweets(id));
        setRefresh(false);
        console.log(tweets)
        

    }
    
    const renderTweets=({item})=>{
        return(
            <Tweet item={item} navigation={navigation} type="profile" />
        )
    }

    if(loading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.light}/>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.cover} >
                <View style={styles.profileInfo}>

                <Image source={{uri : 'https://pbs.twimg.com/profile_images/1206237605806985221/pW65Z4C9_400x400.jpg'}} style={styles.image} />
                <View style={styles.profileText}>
                <Text style={styles.name}>Onur</Text>
                <Text style={styles.username}>@Onur23</Text>
                <Text style={styles.bio}>I don't give damn what you think. I'm doin this for me</Text>
                <View style={styles.infoContainer}>
                <EvilIcons name="location" size={24} color={colors.gray} />
                <Text style={styles.locationText}>221B-Baker Street</Text>
                </View>
                <View style={styles.infoContainer}>
                <FontAwesome name="birthday-cake" size={16} color={colors.gray} />
                <Text style={styles.birtdayText}>11 Feb 1995</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.followers}><Text style={styles.followerNumber}>118</Text> <Text style={styles.followerText}>Following</Text></Text><Text style={styles.followers}><Text style={styles.followerNumber}>59</Text> <Text style={styles.followerText}>Followers</Text></Text>
                </View>
                
                 </View>
                
                </View>

            </View>
            <View style={styles.tweets}>
            <FlatList refreshing={refresh} onRefresh={loadTweets} data={tweets} renderItem={renderTweets} navigation={navigation}/>
            </View>
            
        </View>
    )

}

const styles = StyleSheet.create({

    screen:{

        flex : 1,
        backgroundColor : colors.dark

    },
    tweets :{

        marginTop : 230,
        height : 350,
        borderTopColor : colors.gray,
        borderTopWidth : 0.5

    },
    centered: { 

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : colors.dark
   
       
       },
    cover : {

        width : '100%',
        height : '16%',
        backgroundColor : colors.light,
    

    },
    image :{

        width : 80,
        height : 80,
        borderRadius :50,
        

    },
    profileInfo : {

        position : 'relative',
        top : 80,
        left : 15

    },
    profileText : {

        marginLeft : 10,
        marginTop : 3

    },
    username : {

        fontSize : 16,
        color : colors.gray,
        fontFamily : 'open-sans'
    },
    name:{

        fontSize : 16,
        color : 'white',
        fontFamily : 'open-sans-bold'
    
    },
    bio :{

        marginTop : 10,
        fontFamily : 'open-sans',
        color : 'white'

    },
    locationText : {

        fontFamily : 'open-sans',
        color : 'white'
    },
    infoContainer:{

        flexDirection : 'row',
        marginTop : 10,
        marginLeft : -7

    },
    birtdayText :{

        fontFamily : 'open-sans',
        color : 'white',
        marginLeft : 5

    },
    followers :{

        
        fontFamily : 'open-sans',
        color : 'white',
        marginRight : 20

    },
    followerText :{

        color : colors.gray

    },
    followerNumber :{

        fontFamily : 'open-sans-extraBold'

    }


})

export default Profile;