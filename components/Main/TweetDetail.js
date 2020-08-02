import React,{useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {View,Text,StyleSheet,TouchableOpacity,Image,TextInput,Keyboard, Alert,FlatList,KeyboardAvoidingView} from "react-native";
import colors from "../../constants/colors";
import * as tweetActions from "../../store/Actions/Tweet";
import Tweet from "./Tweet";



const TweetDetail=props=>{

    const tweet = props.route.params.item;
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state=>state.auth.user);
    const {navigation} = props;

    const tweetComment=()=>{


        let comments = tweet.comments;

        let newComment = {

            text : comment,
            owner : user

        }

        comments.push(newComment);

        let obj ={

            comments : comments

        }
        setComment('');
        Keyboard.dismiss();
        dispatch(tweetActions.updateTweet(tweet._id,obj));

    }
    const renderComments=({item})=>{

        console.log(item)

        let newItem={

            userId : item.owner,
            context : item.text,
            comments : item

        }

        return(
            <Tweet item={newItem} type={"comment"} navigation={navigation} />
        )

    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "height" : null} style={styles.screen}>
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
            <FlatList data={tweet.comments} renderItem={renderComments} />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
            <TextInput onFocus={()=>setShow(prev=>!prev)} value={comment} onChangeText={text=>setComment(text)} onBlur={()=>setShow(prev=>!prev)}  style={styles.input} placeholder="Tweet your comment" />
           { show ? <TouchableOpacity onPress={()=>tweetComment()} style={styles.tweetButton}><Text style={{color : 'white'}}>Tweet</Text></TouchableOpacity>  : null}
            </View>
            <View style={{height: 560}} />
        </KeyboardAvoidingView>
       
    )
}

const styles = StyleSheet.create({

    screen:{

        flex : 1,
        backgroundColor : colors.dark

    },
    tweet : {

        width : '100%',
        height : '100%',
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

    },
    inputContainer:{

        position : 'absolute',
        bottom : 0,
        padding : 10,
        width : '100%',
        height : 90,
        borderTopWidth : 1,
        borderTopColor : colors.gray


    },
    input:{

        width : '100%',
        height : '70%',
        borderRadius : 25,
        paddingHorizontal : 15,
        color :colors.light,
        backgroundColor : '#14171A'
    },
    tweetButton :{

        width : '20%',
        height : 25,
        backgroundColor : colors.light,
        borderRadius : 25,
        justifyContent : 'center',
        alignItems :'center',
        alignSelf :'flex-end',
        marginTop : 5,
        marginBottom : 5
    },


})

export default TweetDetail;