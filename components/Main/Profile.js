import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,SafeAreaView, Image,FlatList,ActivityIndicator,TouchableOpacity} from "react-native";
import colors from "../../constants/colors";
import {FontAwesome,EvilIcons} from "@expo/vector-icons";
import {useDispatch,useSelector} from "react-redux";
import * as tweetActions from "../../store/Actions/Tweet";
import {updateFollowing,updateFollowers,loadUser} from "../../store/Actions/User";
import Tweet from "./Tweet";

const Profile=props=>{

    const dispatch= useDispatch();
    const profile = props.route.params.user;
    let user = useSelector(state=>state.auth.user);
    let otherUser= useSelector(state=>state.user.profile);
    let tweets = useSelector(state=>state.tweet.userTweets);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isFollowed, setIsFollowed] = useState()
    const {navigation} = props;


    useEffect(()=>{

        setLoading(true);
        loadTweets();
        setLoading(false);
        console.log('loaded')

    },[dispatch]);

    useEffect(()=>{

        isFollowing();

    },[user])

    
    const loadTweets=async()=>{

        setRefresh(true);
        await dispatch(loadUser(profile._id));
        setRefresh(false);
       
       
    }

    const updateUser=(action)=>{

        let newFollowing = user.following;
        let newFollowers = profile.followers;
     
        if(action === 1){
        newFollowing.push(profile._id);
        newFollowers.push(user._id);
        dispatch(updateFollowing(user._id,newFollowing));
        dispatch(updateFollowers(profile._id,newFollowers));
        setIsFollowed(true);

        }else if(action === 0){

           let updatedFollowing = newFollowing.filter(c=> c !== profile._id);
           let updatedFollowers = newFollowers.filter(c=> c !== user._id);

        dispatch(updateFollowing(user._id,updatedFollowing));
        dispatch(updateFollowers(profile._id,updatedFollowers));
        setIsFollowed(false);

        }
    
    
    }

    const renderTweets=({item})=>{

        let newItem={

            userId : otherUser,
            context : item.context,
            comments : item.comments,
            like : item.like

        }        

        return(
            <Tweet item={newItem} navigation={navigation} type="profile"/>
        )
    }

    const isFollowing=()=>{


        let followings = user.following.filter(c=> otherUser._id === c);
      
        if(followings.length>0){

           setIsFollowed(true);

        }

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
            <View style={styles.cover}>
            </View>
                <View style={styles.profileInfo}>

                <View style={{flexDirection : 'row',width : '100%',justifyContent : 'space-between'}}>
                
                <Image source={{uri : otherUser.pic}} style={styles.image} />
                
                 { isFollowed ? <TouchableOpacity style={styles.button} onPress={()=>updateUser(0)} >
                    <Text style={{color : 'white',fontFamily : 'open-sans'}}>Following</Text>
                </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={()=>updateUser(1)} >
                    <Text style={{color : 'white',fontFamily : 'open-sans'}}>Follow</Text>
                </TouchableOpacity>}
               
                </View>
                
                <View style={styles.profileText}>
                <Text style={styles.name}>{otherUser.name}</Text>
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
                    <Text style={styles.followers}><Text style={styles.followerNumber}>{118}</Text> <Text style={styles.followerText}>Following</Text></Text><Text style={styles.followers}><Text style={styles.followerNumber}>59</Text> <Text style={styles.followerText}>Followers</Text></Text>
                </View>
                 </View>
                </View>
            <View style={styles.tweets}>
            <FlatList refreshing={refresh} onRefresh={loadTweets} data={otherUser.tweets} renderItem={renderTweets} navigation={navigation}/>
            </View>
            
        </View>
    )

}

const styles = StyleSheet.create({

    screen:{

        flex : 1,
        backgroundColor : colors.dark

    },
    button :{
        marginRight : 30,
        marginTop : 40,
        justifyContent : 'center',
        backgroundColor : colors.light,
        borderRadius : 25,
        width : '17%',
        height : '35%',
        alignItems : 'center'
    },
    tweets :{

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
        top : -25,
        left : 15,
        width : '100%',
        height : '35%'

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