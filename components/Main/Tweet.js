import React,{useState} from "react";
import {View,Text,StyleSheet,TouchableOpacity,Image} from "react-native";
import {useSelector,useDispatch} from "react-redux";
import colors from "../../constants/colors";
import * as tweetActions from "../../store/Actions/Tweet";
import {Ionicons,EvilIcons} from "@expo/vector-icons";

const Tweet=props=>{

    
    const user= useSelector(state=>state.auth.user);
    let tweets = useSelector(state=>state.tweet.tweets);
    const dispatch = useDispatch();
    const [color, setColor] = useState(colors.gray);
    const {navigation,item,type} = props;

    const like=(id,currentLike)=>{

        if(didLike(currentLike)){

            setColor(colors.gray);

            let updatedLikes = currentLike.filter(c=>c !== user._id);

            let obj ={

                like :updatedLikes

            }

            dispatch(tweetActions.updateTweet(id,obj));


        }else{

            setColor("#E0245E");
            currentLike.push(user._id);

            let obj ={

                like :currentLike

            }
            dispatch(tweetActions.updateTweet(id,obj));

        }     

    }

    const didLike=(currentLike)=>{

        let liked = currentLike.filter(c=> c===user._id);

        if(liked.length>0){

            return true

        }else{

            return false;

        }

    }

    return(
        <TouchableOpacity style={styles.tweet} onPress={()=>{ navigation ? navigation.navigate('TweetDetail',{item}) : null }}>
        <View style={{flexDirection : 'row'}}>
        <Image source={{uri : item.userId.pic}} style={styles.image} />
        <View style={styles.textContainer}>
            <View style={styles.userInfo}>
            <Text style={styles.name}>{item.userId.name}</Text><Text style={styles.username}>@Onurr_23</Text>
            </View>
            <View style={styles.tweetContainer}>
            <Text style={styles.tweetText}>{item.context}</Text>
            </View>
        </View>
        </View>
        {type !=='comment' ?   <View style={styles.buttons}>
            <TouchableOpacity style={styles.tweetButtons} onPress={()=>didLike(item.like)}>
            <EvilIcons name="comment" size={24} color={colors.gray} />
            <Text style={styles.like}>{item.comments.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <EvilIcons name="retweet" size={24} color={colors.gray} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tweetButtons} onPress={()=>like(item._id,item.like)}>
    { didLike(item.like) ? <View style={{flexDirection : 'row'}}><Ionicons name="md-heart" size={20} color="#E0245E" /><Text style={styles.like}>{item.like.length}</Text></View>:
                <View style={{flexDirection : 'row'}}><Ionicons name="ios-heart-empty" size={20} color={color} /><Text style={styles.like}>{item.like.length}</Text></View>  
                }
           
            </TouchableOpacity>
        </View> : null


        }
     
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({

    tweet : {

        width : '100%',
        padding : 10,
        borderBottomColor : colors.gray,
        borderBottomWidth :0.3,
        flexDirection : 'column'
    
    },
    image :{

        width : 50,
        height:50,
        borderRadius : 50
    },
    userInfo:{

        flexDirection : 'row',
        marginLeft : 15
    },
    name:{
    
        fontSize : 17,
        color : 'white',
        fontFamily : 'open-sans-bold'
    
    },
    username : {

        fontSize : 17,
        color : colors.gray,
        fontFamily : 'open-sans'
    },
    tweetContainer :{
    
        marginLeft : 15,
        width : '160%'
    
    },
    tweetText :{
    
        color : 'white',
        fontFamily : 'open-sans'
    
    },
    buttons :{

        flexDirection :'row',
        justifyContent :'space-around'
    
    },
    tweetButtons :{
    
        flexDirection : 'row'
    
    },
    like :{
    
        marginLeft : 5,
        color : colors.gray
    }   

})

export default Tweet;